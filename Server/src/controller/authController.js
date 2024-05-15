const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { secretKey } = require("../middlewares/authentication");
require('dotenv').config(); 


const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log("Données reçues pour connexion :", req.body);

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({
            error: error.message,
            message: "Utilisateur ou mot de passe incorrect",
          });
      }

      console.log("Données de l'utilisateur :", req.body);

      const isValid = bcrypt.compare(password, user.password);

      if (!isValid) {
        return res
          .status(401)
          .json({ message: "Utilisateur ou mot de passe incorrect" });
      }

      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "30000000s",
      });

      res.status(200).json({ token, username: user.username });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      console.log("Données reçues pour l'inscription :", req.body);

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        role: "user", // Définit le rôle par défaut comme "user"
      });

      // Enregistre le nouvel utilisateur dans la base de données
      await newUser.save();
      console.log("Utilisateur ajouté avec succès !");

      // Appel de la méthode login pour récupérer les données de l'utilisateur
      const userData = await authController.login(req, res);

      // Envoie une réponse avec les données de l'utilisateur
      res.status(201).json(userData);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.username) {
        // Gérer l'erreur de contrainte d'unicité du nom d'utilisateur
        res.status(400).json({ error: "Ce nom d'utilisateur est déjà pris" });
      } else {
        console.error("Erreur lors de l'inscription :", {
          error: error.message,
        });
        res.status(500).json({ error: error.message });
      }
    }
  },

  checkUsername: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });

      if (user) {
        console.log("Ce nom d'utilisateur est déjà pris");
        return res
          .status(400)
          .json({ error: "Ce nom d'utilisateur est déjà pris" });
      }

      if (user) {
        console.log("Nom d'utilisateur trouvé :", user.username);
        return res.json({ username: user.username });
      }

      res.json({ available: true });
    } catch (error) {
      res.status(500).json({
        error: "Une erreur s'est produite lors de la vérification de username.",
      });
    }
  },

  checkEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (user) {
        console.log("Cet email est déjà pris");
        return res.status(400).json({ error: "Cet email est déjà pris" });
      }
      res.json({ available: true });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la vérification de l'email :",
        error
      );
      res.status(500).json({
        error: "Une erreur s'est produite lors de la vérification de l'email.",
      });
    }
  },

  getUserDetails: async (req, res) => {
    try {
      // L'ID de l'utilisateur est extrait du token JWT vérifié
      const userId = req.auth.userId;

      // Utilisez l'ID de l'utilisateur pour obtenir les détails de l'utilisateur depuis la base de données
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Renvoyer les détails de l'utilisateur en réponse
      res.status(200).json({ username: user.username });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'utilisateur :",
        error
      );
      res
        .status(500)
        .json({
          error: "Erreur lors de la récupération des détails de l'utilisateur",
        });
    }
  },
};

module.exports = authController;
