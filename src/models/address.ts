import mongoose, { Schema } from "mongoose";
import IAddress from "../interfaces/address";

const AddressSchema: Schema = new Schema(
  {
    clientId: { type: String },
    street: { type: String, required: true },
    number: { type: Number, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAddress>("Address", AddressSchema);
