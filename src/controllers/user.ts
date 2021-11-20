import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import User from "../models/user";
import jwt from "jsonwebtoken";
import hash from "object-hash";
import jwt_decode from "jwt-decode";
import IToken from "../interfaces/token";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createUser = async (req: Request, res: Response) => {
  let { name, email, password } = req.body;
  const hashPassword = hash(password);

  try {
    const user = await User.insertMany([
      { name: name, email: email, password: hashPassword },
    ]);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: hash(req.body.password),
    });

    const secret = process.env.SECRET;
    if (user) {
      const id: ObjectId = user?._id;
      const token = jwt.sign({ id }, secret ?? "", {
        expiresIn: 86400,
      });
      res.status(200).json(token);
    }
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getUserByToken = async (req: Request, res: Response) => {
  let bearerToken = req.headers.authorization;
  let tokenNumber = bearerToken?.slice(7);
  const token: IToken = jwt_decode(tokenNumber ?? "");

  try {
    const user = await User.findOne({ _id: token.id });
    if (user) res.status(200).json(user);

    res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const removeByToken = async (req: Request, res: Response) => {
  let bearerToken = req.headers.authorization;
  let tokenNumber = bearerToken?.slice(7);
  const token: IToken = jwt_decode(tokenNumber ?? "");

  try {
    const user = await User.findByIdAndRemove({ _id: token.id });
    if (user) res.status(200).json(user);
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).send(err);
  }
};
