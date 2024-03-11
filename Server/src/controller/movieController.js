const Movie = require("../models/movie");

const movieController = {
 
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
      const movie = await Movie.findOne({ name: req.params.name });
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
};

module.exports = movieController;
