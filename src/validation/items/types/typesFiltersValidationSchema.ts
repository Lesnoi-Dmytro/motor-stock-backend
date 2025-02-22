import mongoose from "mongoose";
import { stringToArray } from "utils/arrays/stringToArray";
import { paginationSchema } from "validation/paginationValidationSchema";
import { z } from "zod";

export const typesFilterSchema = paginationSchema.merge(
  z.object({
    name: z.string().optional(),
    exclude: z
      .string()
      .refine((value) =>
        stringToArray(value).every(mongoose.Types.ObjectId.isValid)
      )
      .optional(),
    ids: z
      .string()
      .refine((value) =>
        stringToArray(value).every(mongoose.Types.ObjectId.isValid)
      )
      .optional(),
  })
);
