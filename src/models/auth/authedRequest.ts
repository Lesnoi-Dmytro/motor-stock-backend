import type { Request } from "express";
import type { UserRole } from "models/users/User";

export interface IAuthedRequest extends Request {
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
}
