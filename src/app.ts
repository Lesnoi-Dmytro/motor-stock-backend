import "@/migrations/migrate";
import "@/config/db";

import express from "express";

import routes from "@/routes/routes";
import { settings } from "@/config/settings";
import { corsConfig } from "@/config/corsConfig";
import { swaggerDocs } from "@/config/swagger";
import { errorHandlingMiddleware } from "@/middleware/errorHandlingMiddleware";

const app = express();
const PORT = settings.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Docs: ${settings.backend_url}/api-docs`);
});

app.use(corsConfig);
app.use(express.json());

app.use("/api", routes);

swaggerDocs(app);

app.use(errorHandlingMiddleware);
