import { objectId } from "utils/validation/objectIdUtil";
import { paginationSchema } from "validation/paginationValidationSchema";
import { z } from "zod";

export const suppliesFilterSchema = paginationSchema.merge(
  z.object({
    item: objectId.optional(),
    sort: z.string().optional(),
  })
);
