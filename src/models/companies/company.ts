import type mongoose from "mongoose";

export interface ICompany {
  _id: mongoose.Types.ObjectId;
  name: string;
}
