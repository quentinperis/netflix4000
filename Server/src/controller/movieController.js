const Movie = require("../models/Movie");
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;

const movieController = {
  addMovies: async (req, res) => {
    try {
      const newMovie = new Movie(req.body);
      await newMovie.save();
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.find().select("_id genre imagePath");
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMovie: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id).select(
        "name description year videoPath"
      );
      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  parDefautPage: (req, res) => {
    res.status(404).send("Oups, on dirait qu'il n'y a pas de films ici");
  },

  updateMoviesPath: async () => {
    try {
      const movies = await Movie.find();
      for (const movie of movies) {
        movie.imagePath = `${BASE_URL}/images/${movie.name}.png`;
        await movie.save();
      }
      console.log(
        "Tous les chemins d'images ont été mis à jour avec succès :)"
      );
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des chemins d'images :",
        error
      );
    }
  },

  updateVideoPath: async () => {
    try {
      const videos = await Movie.find();
      for (const video of videos) {
        video.videoPath = `${BASE_URL}/videos/${video.name}.mp4`;
        await video.save();
      }
      console.log(
        "Tous les chemins d'a video ont été mis à jour avec succès :)"
      );
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des chemins de la video :",
        error
      );
    }
  },
};

module.exports = movieController;
