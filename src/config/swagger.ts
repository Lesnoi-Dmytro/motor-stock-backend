import { settings } from "@/config/settings";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const specs = swaggerJsdoc({
  definition: {
    openapi: "3.1.0",
    info: {
      test: 1,
      title: "MotorStock Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application for MotorStock application made with Express and documented with Swagger",
      contact: {
        name: "MotorStock",
        email: "dmytrolesnoi@gmail.com",
      },
    },
    servers: [
      {
        url: settings.backend_url,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["src/routes/**/*.ts"],
});

export const swaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
