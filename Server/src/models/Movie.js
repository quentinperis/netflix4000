const mongoose = require("mongoose");

// schéma principal du film
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  year: { type: String, required: true },
  genre: { type: [String], required: true }, 
  // Utilisation d'un tableau pour les genres
  imagePath: { type: String, required: false }, 
  videoPath: { type: String, required: false }, 
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;