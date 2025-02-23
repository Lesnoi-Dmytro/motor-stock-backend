import { paginationSchema } from "@/validation/paginationValidationSchema";
import { z } from "zod";

export const itemsByCompanyFilterSchema = paginationSchema.merge(
  z.object({
    article: z.string().optional(),
  })
);
