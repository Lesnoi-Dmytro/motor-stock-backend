import createHttpError from "http-errors";
import type { NextFunction, Request, Response } from "express";

export const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (createHttpError.isHttpError(err)) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }

  next();
};
