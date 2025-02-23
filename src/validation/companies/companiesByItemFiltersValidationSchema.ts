import { paginationSchema } from "validation/paginationValidationSchema";
import { z } from "zod";

export const companiesByItemFilterSchema = paginationSchema.merge(
  z.object({
    name: z.string().optional(),
  })
);
