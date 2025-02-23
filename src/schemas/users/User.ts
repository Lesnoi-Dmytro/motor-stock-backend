import { type IUser, UserRole } from "@/models/users/user";
import mongoose from "mongoose";
import { Company } from "@/schemas/companies/Company";

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.EMPLOYEE,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Company.modelName,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
