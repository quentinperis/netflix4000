const User = require("../model/user");

const userController = {
  addMovie: async (req, res) => {
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
      const movies = await Movie.find();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getMovie: async (req, res) => {
    try {
      const movie = await Movie.findOne({ title: req.params.title });
      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateMovie: async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
      }
      res.json({ message: "Film supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  parDefautPage: (req, res) => {
    res.status(404).send("Oups, on dirait qu'il n'y a pas de films ici");
  },
};

module.exports = movieController;