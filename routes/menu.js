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

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Ajouter un nouveau plat au menu
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: integer
 *               country:
 *                 type: integer
 *               subcategorie:
 *                 type: integer
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plat ajouté avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post("/menu", (req, res) => {
  const { category, country, subcategorie, name, price, description } =
    req.body;
  const query = `
    INSERT INTO menu (category, country, subcategorie, name, price, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [category, country, subcategorie, name, price, description],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la création d'un nouveau plat :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
        return;
      }
      res.json({ message: "Nouveau plat ajouté avec succès" });
    }
  );
});

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Mettre à jour un plat
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: integer
 *               country:
 *                 type: integer
 *               subcategorie:
 *                 type: integer
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plat mis à jour avec succès
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     summary: Supprimer un plat
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Plat supprimé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.put("/menu/:id", (req, res) => {
  const menuId = req.params.id;
  const { category, country, subcategorie, name, price, description } =
    req.body;
  const query = `
    UPDATE menu 
    SET category = ?, country = ?, subcategorie = ?, name = ?, price = ?, description = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [category, country, subcategorie, name, price, description, menuId],
    (error, results) => {
      if (error) {
        console.error("Erreur lors de la mise à jour du plat :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
        return;
      }
      res.json({ message: "Plat mis à jour avec succès" });
    }
  );
});

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete menu
 *     responses:
 *       200:
 *         description: Delete menu successfully
 */
router.delete("/menu/:id", (req, res) => {
  const menuId = req.params.id;
  const query = `
    DELETE FROM menu 
    WHERE id_menu = ?
  `;

  connection.query(query, [menuId], (error, results) => {
    if (error) {
      console.error("Erreur lors de la suppression du plat :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
      return;
    }
    res.json({ message: "Plat supprimé avec succès" });
  });
});

module.exports = router;
