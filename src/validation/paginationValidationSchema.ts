import {
  validateStringInteger,
  validateStringPositiveInteger,
} from "utils/validation/stringIntegerUtil";
import { z } from "zod";

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .refine(validateStringInteger, {
      message: "Must be a number",
    })
    .refine(validateStringPositiveInteger, {
      message: "Must be a positive number",
    }),
  pageSize: z
    .string()
    .optional()
    .refine(validateStringInteger, {
      message: "Must be a number",
    })
    .refine(validateStringPositiveInteger, {
      message: "Must be a positive number",
    }),
});
