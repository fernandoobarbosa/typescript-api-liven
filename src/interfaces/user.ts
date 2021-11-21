import { Document } from "mongoose";
import IAddress from "./address";

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  addresses?: IAddress[];
}
