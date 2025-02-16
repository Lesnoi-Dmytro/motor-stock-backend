import type { ICompany } from "models/companies/company";
import mongoose from "mongoose";

const companySchema = new mongoose.Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const Company = mongoose.model("Companies", companySchema);
