import express, { Request, Response } from "express";
import {
  getUserByToken,
  removeByToken,
  login,
  createUser,
} from "../controllers/user";

import auth from "../middleware/auth";

const app = express();
app.use(express.json());

app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).send({ message: "Working!" });
});

app.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

app.post("/user", (req: Request, res: Response) => {
  createUser(req, res);
});

app.get("/user/information", auth, (req: Request, res: Response) => {
  getUserByToken(req, res);
});

app.delete("/user/remove", auth, (req: Request, res: Response) => {
  removeByToken(req, res);
});

export default app;
