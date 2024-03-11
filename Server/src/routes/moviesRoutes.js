const express = require("express");
const router = express.Router();
const movieController = require("../controller/movieController");

router.get("/movies", movieController.getAllMovies);
router.get("/:name", movieController.getMovie);
router.get("*", movieController.parDefautPage);

module.exports = router;
