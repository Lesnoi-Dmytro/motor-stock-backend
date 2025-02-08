import express from "express";

import { specs } from "config/swagger";
import swaggerUi from "swagger-ui-express";
import authRoute from "routes/auth";
import { settings } from "config/settings";
import { corsConfig } from "config/corsConfig";
import "./config/db";
import "./config/seed";

const app = express();
const PORT = settings.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Docs: ${settings.backend_url}/api-docs`);
});

app.use(corsConfig);

app.use("/auth", authRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
