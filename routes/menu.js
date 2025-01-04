const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Configuration de la connexion
const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "lfm",
});

connection.connect((error) => {
  if (error) {
    console.error("Erreur de connexion à la base de données :", error.message);
  } else {
    console.log("Connecté à la base de données MySQL.");
  }
});

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Category
 *     responses:
 *       200:
 *         description: A list of categories
 */
router.get("/categories", (req, res) => {
  const query = "SELECT * FROM categorie";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
      return;
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /api/subcategories:
 *   get:
 *     summary: subcategory
 *     responses:
 *       200:
 *         description: A list of subcategories
 */
router.get("/subcategories", (req, res) => {
  const query = "SELECT * FROM subcategorie";
  connection.query(query, (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de la récupération des sous-catégories :",
        error
      );
      res.status(500).json({ error: "Erreur interne du serveur" });
      return;
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Countries
 *     responses:
 *       200:
 *         description: A list of countries
 */
router.get("/countries", (req, res) => {
  const query = "SELECT * FROM country";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de la récupération des pays :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
      return;
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Menu
 *     responses:
 *       200:
 *         description: A list of menu
 */
router.get("/menu", (req, res) => {
  const query = `
    SELECT 
      m.id_menu, m.category, m.country, m.subcategorie, m.name, m.price, m.description,
      c.cat_label,
      sc.sub_label,
      co.flag,
      co.name as country_name
    FROM menu m
    LEFT JOIN categorie c ON m.category = c.id
    LEFT JOIN subcategorie sc ON m.subcategorie = sc.id
    LEFT JOIN country co ON m.country = co.id
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de la récupération du menu :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
      return;
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /api/menu/category/{id}:
 *   get:
 *     summary: Menu by category
 *     responses:
 *       200:
 *         description: A list of menu by category
 */

router.get("/menu/category/:id", (req, res) => {
  const categoryId = req.params.id;
  const query = `
    SELECT * FROM menu 
    WHERE category = ?
  `;

  connection.query(query, [categoryId], (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de la récupération des plats par catégorie :",
        error
      );
      res.status(500).json({ error: "Erreur interne du serveur" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
