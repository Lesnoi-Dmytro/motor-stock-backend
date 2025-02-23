import { settings } from "@/config/settings";
import cors, { type CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: settings.frontend_url,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const corsConfig = cors(corsOptions);
