import type mongoose from "mongoose";

export interface IType {
  _id: mongoose.Types.ObjectId;
  name: string;
}
