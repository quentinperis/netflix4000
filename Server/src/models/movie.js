const mongoose = require("mongoose");

// sous-schéma pour le champ genre
const genreSchema = new mongoose.Schema({
  one: { type: String, required: true },
  two: { type: String, required: true },
  three: { type: String, required: true }
});

// schéma principal du film
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  year: { type: String, required: true },
  genre: { type: genreSchema, required: true },
  imagePath: { type: String, required: true }, // Champ pour le chemin de l'image
  videoPath: { type: String, required: true }, // Champ pour le chemin de la video
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;