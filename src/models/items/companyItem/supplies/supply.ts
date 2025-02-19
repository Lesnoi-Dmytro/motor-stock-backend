import type { ICompanyItem } from "models/items/companyItem/companyItem";
import type mongoose from "mongoose";

export interface ISupply {
  _id: mongoose.Types.ObjectId;
  item: mongoose.Types.ObjectId | ICompanyItem;
  quantity: number;
  date: Date;
  price: number;
}
