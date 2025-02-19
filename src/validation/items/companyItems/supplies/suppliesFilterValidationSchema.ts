import mongoose from "mongoose";
import { paginationSchema } from "validation/paginationValidationSchema";
import { z } from "zod";

export const suppliesFilterSchema = paginationSchema.merge(
  z.object({
    item: z
      .string()
      .refine((value) => mongoose.Types.ObjectId.isValid(value))
      .optional(),
  })
);
