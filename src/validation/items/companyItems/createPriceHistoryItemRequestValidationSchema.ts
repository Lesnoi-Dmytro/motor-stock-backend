import { z } from "zod";

export const createPriceHistoryItemRequestSchema = z
  .object({
    price: z.number().min(0.01),
    date: z.string().date(),
  })
  .strict();
