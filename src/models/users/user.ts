import type { ICompany } from "models/companies/company";
import type mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  color: UserColors;
  password: string;
  role: UserRole;
  company?: mongoose.Types.ObjectId | ICompany;
}

export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  SUPPLIER = "SUPPLIER",
}

export enum UserColors {
  BLUE = "#1976D2",
  INDIGO = "#512DA8",
  PURPLE = "#7B1FA2",
  DEEP_PURPLE = "#673AB7",
  TEAL = "#00796B",
  GREEN = "#388E3C",
  ORANGE = "#F57C00",
  RED = "#D32F2F",
  PINK = "#C2185B",
  BROWN = "#5D4037",
  GRAY = "#424242",
}
