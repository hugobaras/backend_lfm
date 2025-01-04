const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const mysql = require("mysql2");

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
 * tags:
 *   name: Users
 *   description: API de gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */
router.post("/api/users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const [result] = await connection
      .promise()
      .query("INSERT INTO users (email, password) VALUES (?, ?)", [
        email,
        hash,
      ]);

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       500:
 *         description: Erreur serveur
 */
router.get("/api/users", async (req, res) => {
  try {
    const query = "SELECT id, username, email FROM users";
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/api/user/:id", async (req, res) => {
  try {
    const [results] = await connection
      .promise()
      .query("SELECT id, username, email FROM users WHERE id = ?", [
        req.params.id,
      ]);

    if (!results.length) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(results[0]);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */
router.put("/api/user/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = password ? await bcrypt.hash(password, 10) : undefined;

    const updates = [];
    const params = [];

    if (username) {
      updates.push("username = ?");
      params.push(username);
    }
    if (email) {
      updates.push("email = ?");
      params.push(email);
    }
    if (hash) {
      updates.push("password = ?");
      params.push(hash);
    }

    if (!updates.length) {
      return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
    }

    const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
    params.push(req.params.id);

    const [result] = await connection.promise().query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/api/user/:id", async (req, res) => {
  try {
    const [result] = await connection
      .promise()
      .query("DELETE FROM users WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connecter un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await connection
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const validPassword = await bcrypt.compare(password, users[0].password);

    if (!validPassword) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    res.json({ message: "Connexion réussie", userId: users[0].id });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
