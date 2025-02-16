import type { ICompany } from "models/companies/company";
import mongoose from "mongoose";

const companySchema = new mongoose.Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Company = mongoose.model("Companies", companySchema);
