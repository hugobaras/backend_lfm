const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
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
 * /api/reservation:
 *   post:
 *     summary: Envoyer une demande de réservation par email
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               date:
 *                 type: string
 *               hour:
 *                 type: string
 *               guests:
 *                 type: integer
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réservation envoyée et enregistrée
 *       500:
 *         description: Erreur serveur
 */
router.post("/reservation", async (req, res) => {
  const { name, email, date, hour, guests, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.fr",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "reservation@lafleurdumekong.fr",
        pass: "GMLQZQU2eNN6w3!",
      },
      tls: {
        rejectUnauthorized: false,
        ciphers: "SSLv3",
      },
    });

    const mailOptions = {
      from: {
        name: "La Fleur du Mekong Restaurant",
        address: "reservation@lafleurdumekong.fr",
      },
      to: "demande@lafleurdumekong.fr",
      subject: "Réservation Restaurant La Fleur du Mekong",
      html: `
        <p>Nouvelle demande de réservation :</p>
        <ul>
          <li><strong>Nom :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Date :</strong> ${date}</li>
          <li><strong>Heure :</strong> ${hour}</li>
          <li><strong>Nombre de personnes :</strong> ${guests}</li>
          <li><strong>Message :</strong> ${message || "N/A"}</li>
        </ul>
      `,
      text: `
        Nouvelle demande de réservation :
        Nom: ${name}
        Email: ${email}
        Date: ${date}
        Heure: ${hour}
        Nombre de personnes: ${guests}
        Message: ${message || "N/A"}
      `,
    };

    await transporter.sendMail(mailOptions);

    const formattedDate = new Date(date).toISOString().split("T")[0];

    const query = `INSERT INTO reservation (name, email, date, hour, guests, message) VALUES (?, ?, ?, ?, ?, ?)`;
    await connection
      .promise()
      .execute(query, [name, email, formattedDate, hour, guests, message]);

    res.status(200).json({
      message: "Demande de réservation envoyée et enregistrée avec succès",
    });
  } catch (error) {
    console.error("Erreur lors du traitement de la réservation :", error);
    res
      .status(500)
      .json({ error: "Erreur lors du traitement de la réservation" });
  }
});

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Liste des réservations
 */
router.get("/reservations", (req, res) => {
  const query = `
      SELECT * FROM reservation
    `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
