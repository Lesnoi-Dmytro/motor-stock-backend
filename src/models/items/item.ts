import type { IType } from "models/items/types/type";
import type mongoose from "mongoose";

export interface IItem {
  _id: mongoose.Types.ObjectId;
  name: string;
  article: string;
  description: string;
  type: mongoose.Types.ObjectId | IType;
  createdAt: Date;
  updatedAt: Date;
}
