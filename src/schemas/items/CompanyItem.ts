import type { ICompanyItem } from "models/items/companyItem/companyItem";
import mongoose from "mongoose";
import { Company } from "schemas/companies/company";
import { Item } from "schemas/items/item";

const companyItemSchema = new mongoose.Schema<ICompanyItem>(
  {
    item: {
      type: mongoose.Types.ObjectId,
      ref: Item.modelName,
      required: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: Company.modelName,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    priceHistory: {
      type: [
        {
          price: Number,
          date: Date,
          createdAt: {
            type: Date,
            default: Date.now,
          },
          updatedAt: {
            type: Date,
            default: Date.now,
          },
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
