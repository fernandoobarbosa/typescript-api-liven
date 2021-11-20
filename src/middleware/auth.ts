import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.SECRET;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ error: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malformatted" });
  }

  jwt.verify(token, secret ?? "", (err) => {
    if (err) return res.status(401).send({ error: "Token invalid" });

    return next();
  });
};
