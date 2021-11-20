import express, { Request, Response } from "express";
import { getAllUsers, login } from "../controllers/user";
import auth from "../middleware/auth";

const app = express();
app.use(express.json());

app.get("/", auth, (req: Request, res: Response) => {
  getAllUsers(req, res);
});

app.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

export default app;
