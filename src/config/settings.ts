import dotenv from "dotenv";

dotenv.config();

export const settings = {
  port: process.env.PORT || 3000,
  db_url: process.env.DB_URL || "",
  jwt_public_key: process.env.JWT_PUBLIC_KEY || "",
  jwt_private_key: process.env.JWT_PRIVATE_KEY || "",
  backend_url: process.env.BACKEND_URL || "",
  frontend_url: process.env.FRONTEND_URL || "",
};
