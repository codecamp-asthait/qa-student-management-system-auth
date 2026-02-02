// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "QA Student Management System API",
      version: "1.0.0",
      description: "API documentation for Student Management System API",
    },
    servers: [
      {
        url: "http://54.255.195.111:5171",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
  }),);
};

module.exports = swaggerDocs;
