const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "La Fleur du Mekong API",
      version: "1.0.0",
      description: "API pour le restaurant La Fleur du Mekong",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de développement",
      },
    ],
  },
  apis: ["./routes/*.js", "./index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Page d'accueil
 *     description: Retourne un message de bienvenue
 *     responses:
 *       200:
 *         description: Message de bienvenue
 */
app.get("/", (req, res) => {
  res.send("Backend Node.js with Express and Swagger");
});

const menuRoutes = require("./routes/menu");
app.use("/api", menuRoutes);

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  console.log(
    `Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`
  );
});
