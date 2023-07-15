import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lulu e-commerce",
      version: "1.0.0",
      description: "Projeto feito para portifólio.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      responses: {
        Success: {
          description: "Successful response",
        },
        Unauthorized: {
          description: "Unauthorized",
        },
        Forbidden: {
          description: "Forbidden",
        },
        NotFound: {
          description: "Resource not found",
        },
        InternalServerError: {
          description: "Internal server error",
        },
        BadRequest: {
          description: "Bad Request",
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
  include: ["./routes/swagger.routes.ts"],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
