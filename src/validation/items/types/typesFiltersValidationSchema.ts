import { objectIdArray } from "utils/validation/objectIdUtil";
import { paginationSchema } from "validation/paginationValidationSchema";
import { z } from "zod";

export const typesFilterSchema = paginationSchema.merge(
  z.object({
    name: z.string().optional(),
    exclude: objectIdArray.optional(),
    ids: objectIdArray.optional(),
  })
);
