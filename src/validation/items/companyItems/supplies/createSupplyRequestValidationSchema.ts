import { objectId } from "utils/validation/objectIdUtil";
import { z } from "zod";

export const createSupplyRequestSchema = z
  .object({
    item: objectId,
    quantity: z.number().min(1).int(),
    price: z.number().min(0.01),
    date: z.coerce.date(),
  })
  .strict();

export const updateSupplyRequestSchema = z
  .object({
    quantity: z.number().min(1).int(),
    price: z.number().min(0.01),
    date: z.coerce.date(),
  })
  .strict();
