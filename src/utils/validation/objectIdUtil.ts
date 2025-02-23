import mongoose from "mongoose";
import { stringToArray } from "@/utils/arrays/stringToArray";
import { z } from "zod";

export const objectId = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  });

export const objectIdArray = z
  .string()
  .refine(
    (value) => stringToArray(value).every(mongoose.Types.ObjectId.isValid),
    { message: "Invalid ObjectId" }
  );
