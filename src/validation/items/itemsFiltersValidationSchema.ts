import { paginationSchema } from "validation/paginationValidationSchema";
import { z } from "zod";

export const itemsFilterSchema = paginationSchema.merge(
  z.object({
    article: z.string().optional(),
  })
);
