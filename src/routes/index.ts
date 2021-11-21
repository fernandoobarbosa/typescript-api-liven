import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";
import {
  getUserByToken,
  removeByToken,
  login,
  createUser,
  updateUserByToken,
} from "../controllers/user";
import {
  createAddress,
  getAddresses,
  getAdressById,
  removeAddressById,
  updateAddressById,
} from "../controllers/address";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Working!" });
});

app.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

app.post("/user", (req: Request, res: Response) => {
  createUser(req, res);
});

app.put("/user", auth, (req: Request, res: Response) => {
  updateUserByToken(req, res);
});

app.get("/user", auth, (req: Request, res: Response) => {
  getUserByToken(req, res);
});

app.delete("/user", auth, (req: Request, res: Response) => {
  removeByToken(req, res);
});

app.get("/user/address", auth, (req: Request, res: Response) => {
  getAddresses(req, res);
});

app.get("/user/address/:id", auth, (req: Request, res: Response) => {
  getAdressById(req, res);
});

app.post("/user/address", auth, (req: Request, res: Response) => {
  createAddress(req, res);
});

app.put("/user/address/:id", auth, (req: Request, res: Response) => {
  updateAddressById(req, res);
});

app.delete("/user/address/:id", auth, (req: Request, res: Response) => {
  removeAddressById(req, res);
});

export default app;
