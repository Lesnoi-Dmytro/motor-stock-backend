import { z } from "zod";

export const updateCompanySchema = z
  .object({
    name: z.string().min(1),
    address: z.string().min(1),
    phoneNum: z
      .string()
      .min(8)
      .max(16)
      .regex(/^\+\d{7,15}$/),
  })
  .strict();
