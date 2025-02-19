import type { ISupply } from "models/items/supply";
import mongoose from "mongoose";
import { CompanyItem } from "schemas/items/companyItem";

const supplySchema = new mongoose.Schema<ISupply>(
  {
    item: {
      type: mongoose.Types.ObjectId,
      ref: CompanyItem.name,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Supply = mongoose.model("Supplies", supplySchema);
