import { Document } from "mongoose";

export default interface IAddress extends Document {
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}
