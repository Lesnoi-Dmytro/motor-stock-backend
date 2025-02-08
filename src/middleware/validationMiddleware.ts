import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";

export default function validationMiddleware<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    } else {
      next();
    }
  };
}
