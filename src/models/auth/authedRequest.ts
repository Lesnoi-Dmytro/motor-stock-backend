import type { Request } from "express";

export interface IAuthedRequest extends Request {
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}
