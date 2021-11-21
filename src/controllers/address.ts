import { Request, Response } from "express";
import Address from "../models/address";
import jwt_decode from "jwt-decode";
import IToken from "../interfaces/token";

export const createAddress = async (req: Request, res: Response) => {
  let { street, number, neighborhood, city, state, country } = req.body;

  let bearerToken = req.headers.authorization;
  let tokenNumber = bearerToken?.slice(7);
  const token: IToken = jwt_decode(tokenNumber ?? "");

  try {
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
