import mongoose from "mongoose";
import { z } from "zod";

export const createSupplyRequestSchema = z
  .object({
    item: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value)),
    quantity: z.number().min(1),
    price: z.number().min(0.01),
    date: z.coerce.date(),
  })
  .strict();
