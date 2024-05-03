const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
      });

      // Enregistre le nouvel utilisateur dans la base de données
      await newUser.save();
      console.log("Utilisateur ajouté avec succès !");

      // Générer un token JWT
      const token = jwt.sign({ userId: newUser._id }, "vivment_ca_marche");
      // Renvoyer le token dans la réponse
      res.status(201).json({ token: token });

      //   res.status(201).json({ message: "Utilisateur ajouté !" });
    } catch (error) {
   
      console.error("Erreur lors de l'inscription :", { error: error.message });
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
