const express = require("express");
const router = express.Router();
const movieController = require("../controller/movieController");
const isAuthenticated = require("../middlewares/authentication");

//-------------------MIDDLEWARE----------------------//
// Définition le répertoire des fichiers statiques avant les routes !!
router.use(express.static("data"));

// Middleware pour restreindre l'accès aux routes de films
 router.use(isAuthenticated); 

// router.post("/add-movies", movieController.addMovies);
router.get("/movies", movieController.getAllMovies);
router.get("/:name", movieController.getMovie);
router.get("*", movieController.parDefautPage);


module.exports = router;
