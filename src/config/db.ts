import { settings } from "config/settings";
import mongoose from "mongoose";

mongoose
  .connect(settings.db_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: unknown) => {
    console.error("Error connecting to MongoDB:", error);
  });
