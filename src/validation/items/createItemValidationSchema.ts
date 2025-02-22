import { z } from "zod";

export const createItemSchema = z
  .object({
    article: z.string(),
    type: z.string(),
    name: z.string(),
    description: z.string(),
  })
  .strict();
