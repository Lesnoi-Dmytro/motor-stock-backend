import express from "express";

import { specs } from "config/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
