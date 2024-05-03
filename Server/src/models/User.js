const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: {
      message: "Ce nom d'utilisateur est déjà pris",
    },
  },
  email: {
    type: String,
    required: true,
    unique: {
      message: "Cet email est déjà utilisé par un autre utilisateur",
    }, // unique pour chaque utilisateur
    validate: {
      validator: function (value) {
        // Validation de l'email avec regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Adresse émail invalide",
    },
  },
  password: { type: String, require: true },
  // role: { 
  //   type: String,
  //   enum: ["user", "admin"], // Définit les rôles autorisés
  //   default: "user", // Par défaut, l'utilisateur est un utilisateur normal
  // },
});

const User = mongoose.model("User", userSchema);

module.exports = User;