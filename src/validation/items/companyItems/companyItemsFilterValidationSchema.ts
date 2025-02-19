import mongoose from "mongoose";
import { stringToArray } from "utils/arrays/stringToArray";
import { paginationSchema } from "validation/paginationValidationSchema";
import { z } from "zod";

export const companyItemsFilterSchema = paginationSchema.merge(
  z.object({
    search: z.string().optional(),
    companies: z
      .string()
      .refine((value) =>
        stringToArray(value).every(mongoose.Types.ObjectId.isValid)
      )
      .optional(),
    types: z
      .string()
      .refine((value) =>
        stringToArray(value).every(mongoose.Types.ObjectId.isValid)
      )
      .optional(),
  })
);
