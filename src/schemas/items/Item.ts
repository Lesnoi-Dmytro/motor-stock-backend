import type { IItem } from "models/items/item";
import mongoose from "mongoose";
import { Type } from "schemas/items/type";

const itemSchema = new mongoose.Schema<IItem>(
  {
    name: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Type.modelName,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Item = mongoose.model("Items", itemSchema);
