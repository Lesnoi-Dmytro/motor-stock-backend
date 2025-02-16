import type { ICompany } from "models/companies/company";
import type { IItem } from "models/items/item";
import type mongoose from "mongoose";

export interface ICompanyItem {
  _id: mongoose.Types.ObjectId;
  item: mongoose.Types.ObjectId | IItem;
  company: mongoose.Types.ObjectId | ICompany;
  priceHistory: [
    {
      price: number;
      date: Date;
    }
  ];
}
