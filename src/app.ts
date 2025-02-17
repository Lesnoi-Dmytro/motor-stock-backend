import express from "express";

import { settings } from "config/settings";
import { corsConfig } from "config/corsConfig";
import "./config/db";
import "./migrations/migrate";
import { errorHandlingMiddleware } from "middleware/errorHandlingMiddleware";
import routes from "routes/routes";
import { swaggerDocs } from "config/swagger";

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
