import { paginationSchema } from "validation/paginationValidationSchema";
import { z } from "zod";

export const companyItemsFilterSchema = paginationSchema.merge(
  z.object({
    search: z.string().optional(),
    companies: z.array(z.string().length(24)).optional(),
    types: z.array(z.string().length(24)).optional(),
  })
);
