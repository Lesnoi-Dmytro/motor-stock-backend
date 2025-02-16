import type { IType } from "models/items/type";
import mongoose from "mongoose";

const typeSchema = new mongoose.Schema<IType>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Type = mongoose.model("Types", typeSchema);
