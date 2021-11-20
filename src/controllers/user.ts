import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import User from "../models/user";
import jwt from "jsonwebtoken";
import hash from "object-hash";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
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
    res.status(404).json({ message: "Usuário não encontrado" });
  } catch (err) {
    res.status(400).send(err);
  }
};
