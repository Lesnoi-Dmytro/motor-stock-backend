import type mongoose from "mongoose";

export interface ICompany {
  _id: mongoose.Types.ObjectId;
  address: string;
  name: string;
  phoneNum: string;
}
