const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API La Fleur du Mekong",
      version: "1.0.0",
      description: "API REST pour le restaurant La Fleur du Mekong",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Serveur de développement",
      },
    ],
  },
  apis: ["./routes/*.js"],
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

// Routes
const menuRoutes = require("./routes/menu");
const reservationRoutes = require("./routes/reservation");
const userRoutes = require("./routes/user");

app.use("/api", menuRoutes);
app.use("/api", reservationRoutes);
app.use("/", userRoutes); // Modification ici pour correspondre aux routes dans user.js

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
  console.log(
    `Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`
  );
});
