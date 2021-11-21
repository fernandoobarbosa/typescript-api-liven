import { Request, Response } from "express";
import Address from "../models/address";
import jwt_decode from "jwt-decode";
import IToken from "../interfaces/token";

export const createAddress = async (req: Request, res: Response) => {
  try {
    let { street, number, neighborhood, city, state, country } = req.body;

    let bearerToken = req.headers.authorization;
    let tokenNumber = bearerToken?.slice(7);
    const token: IToken = jwt_decode(tokenNumber ?? "");
    const address = await Address.insertMany([
      {
        clientId: token.id,
        street,
        number,
        neighborhood,
        city,
        state,
        country,
      },
    ]);
    res.status(201).json(address);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAddresses = async (req, res) => {
  try {
    let bearerToken = req.headers.authorization;
    let tokenNumber = bearerToken?.slice(7);
    const token: IToken = jwt_decode(tokenNumber ?? "");
    req.query.clientId = token.id;
    const query = req.query;

    const addresses = await Address.find(query);
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAdressById = async (req, res) => {
  try {
    let bearerToken = req.headers.authorization;
    let tokenNumber = bearerToken?.slice(7);
    const token: IToken = jwt_decode(tokenNumber ?? "");
    const id = req.params.id;
    const address = await Address.findOne({ _id: id, clientId: token.id });
    if (address) res.status(200).json(address);
    else res.status(404).send("Address not found");
  } catch (err) {
    res.status(500).send(err);
  }
};

export const removeAddressById = async (req, res) => {
  try {
    let bearerToken = req.headers.authorization;
    let tokenNumber = bearerToken?.slice(7);
    const token: IToken = jwt_decode(tokenNumber ?? "");
    const id = req.params.id;
    const address = await Address.findOneAndDelete({
      _id: id,
      clientId: token.id,
    });
    if (address) res.status(200).json("Address deleted");

    res.status(404).send({ message: "Address not found" });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateAddressById = async (req, res) => {
  try {
    let bearerToken = req.headers.authorization;
    let tokenNumber = bearerToken?.slice(7);
    const token: IToken = jwt_decode(tokenNumber ?? "");
    const id = req.params.id;
    const address = await Address.findOneAndUpdate(
      { _id: id, clientId: token.id },
      req.body,
      { new: true }
    );
    if (address) res.status(200).json({ message: "User updated" });

    res.status(404).send({ message: "Address not found" });
  } catch (err) {
    res.status(500).send(err);
  }
};
