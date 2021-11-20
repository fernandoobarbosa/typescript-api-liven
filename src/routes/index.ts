import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";
import {
  getUserByToken,
  removeByToken,
  login,
  createUser,
} from "../controllers/user";
import auth from "../middleware/auth";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).send({ message: "Working!" });
});

app.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

app.post("/user", (req: Request, res: Response) => {
  createUser(req, res);
});

app.get("/user", auth, (req: Request, res: Response) => {
  getUserByToken(req, res);
});

app.delete("/user", auth, (req: Request, res: Response) => {
  removeByToken(req, res);
});

export default app;
