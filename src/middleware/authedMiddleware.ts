import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import type { IAuthedRequest } from "models/auth/authedRequest";
import { UserRole } from "models/users/User";
import jwtService from "services/auth/jwtService";

export function authedMiddleware(roles?: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || "Bearer ";
    try {
      const jwtPayload = jwtService.decodeToken(token.substring(7));

      const user = {
        _id: jwtPayload.sub!,
        email: jwtPayload.email!,
        firstName: jwtPayload.firstName!,
        lastName: jwtPayload.lastName!,
        role: jwtPayload.role!,
      };
      if (roles && !roles.includes(user.role)) {
        next(createHttpError(403, "Forbidden"));
        return;
      }

      (req as IAuthedRequest).user = user;

      next();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Token expired") {
          next(createHttpError(403, "Token expired"));
          return;
        } else {
          next(createHttpError(403, "Invalid token"));
          return;
        }
      }
      next(error);
    }
  };
}
