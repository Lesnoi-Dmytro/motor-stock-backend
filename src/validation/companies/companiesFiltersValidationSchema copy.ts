import { objectIdArray } from "utils/validation/objectIdUtil";
import { paginationSchema } from "validation/paginationValidationSchema";
import { z } from "zod";

export const companiesFilterSchema = paginationSchema.merge(
  z.object({
    name: z.string().optional(),
    ids: objectIdArray.optional(),
    exclude: objectIdArray.optional(),
  })
);
