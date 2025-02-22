import mongoose from "mongoose";
import { createItemSchema } from "validation/items/createItemValidationSchema";
import { z } from "zod";

export const createCompanyItemSchema = z
  .object({
    company: z
      .string()
      .refine((value) => mongoose.Types.ObjectId.isValid(value)),
    item: z.union([
      z.object({
        article: z.string(),
      }),
      createItemSchema,
    ]),
    price: z.number().min(0.01),
    quantity: z.number().min(1).optional(),
  })
  .strict();
