const express = require("express");
const router = express.Router();
const movieController = require("../controller/movieController");

//-------------------MIDDLEWARE----------------------//
// Définition le répertoire des fichiers statiques avant les routes !!
router.use(express.static("data"));

router.post("/add-movies", movieController.addMovies);
router.get("/movies", movieController.getAllMovies);
router.get("/:name", movieController.getMovie);
router.get("*", movieController.parDefautPage);


module.exports = router;
