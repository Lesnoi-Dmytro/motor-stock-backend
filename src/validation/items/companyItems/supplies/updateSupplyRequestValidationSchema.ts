import mongoose from "mongoose";
import { z } from "zod";

export const updateSupplyRequestSchema = z
  .object({
    item: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value)),
    quantity: z.number().min(1),
    date: z.coerce.date(),
    price: z.number().min(0.01),
  })
  .strict();
