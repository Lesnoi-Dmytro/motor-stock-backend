import { objectIdArray } from "@/utils/validation/objectIdUtil";
import { paginationSchema } from "@/validation/paginationValidationSchema";
import { z } from "zod";

export const companyItemsFilterSchema = paginationSchema.merge(
  z.object({
    search: z.string().optional(),
    companies: objectIdArray.optional(),
    companyName: z.string().optional(),
    types: objectIdArray.optional(),
    items: objectIdArray.optional(),
    article: z.string().optional(),
  })
);
