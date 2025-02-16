import type { ICompanyItem } from "models/items/companyItem";
import mongoose from "mongoose";
import { Company } from "schemas/companies/Company";
import { Item } from "schemas/items/Item";

const companyItemSchema = new mongoose.Schema<ICompanyItem>(
  {
    item: {
      type: mongoose.Types.ObjectId,
      ref: Item.name,
      required: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: Company.name,
      required: true,
    },
    priceHistory: {
      type: [
        {
          price: Number,
          date: Date,
        },
      ],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const CompanyItem = mongoose.model("CompanyItems", companyItemSchema);
