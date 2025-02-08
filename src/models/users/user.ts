import type mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  company?: string;
}

export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  SUPPLIER = "SUPPLIER",
}
