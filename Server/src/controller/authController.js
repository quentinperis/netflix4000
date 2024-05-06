const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { secretKey } = require("../middlewares/authentication");
require('dotenv').config(); 


const authController = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Affiche les données reçues dans la console
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

      // Générer un token JWT
      const token = jwt.sign({ userId: newUser._id }, secretKey);

      // Renvoyer le token dans la réponse
      res.status(201).json({ token: token });

    } catch (error) {
      if (error.code === 11000 && error.keyPattern.username) {
        // Gérer l'erreur de contrainte d'unicité du nom d'utilisateur
        res.status(400).json({ error: "Ce nom d'utilisateur est déjà pris" });
      } else {
        // Autres erreurs
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
      res.json({ available: true });
    } catch (error) {
      res
      .status(500)
      .json({
        error: 
        "Une erreur s'est produite lors de la vérification de username.",
      });
    }
  },

  checkEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (user) {
        console.log("Cet email est déjà pris");
        return res
        .status(400)
        .json({ error: "Cet email est déjà pris" });
      }
      res.json({ available: true });

    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la vérification de l'email :",
        error
      );
      res
        .status(500)
        .json({
          error:
            "Une erreur s'est produite lors de la vérification de l'email.",
        });
    }
  },


  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      console.log("Données reçues pour connexion :", req.body);

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({error: error.message, message: "Utilisateur ou mot de passe incorrect" });
      }
  
      const isValid = bcrypt.compare(password, user.password);
  
      if (!isValid) {
        return res
          .status(401)
          .json({ message: "Utilisateur ou mot de passe incorrect" });
      }
  
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1800s",
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};

module.exports = authController;
