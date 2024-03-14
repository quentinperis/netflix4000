const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors'); 

const movieRouter = require("./src/routes/moviesRoutes");
const movieController = require("./src/controller/movieController");

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect("mongodb://localhost:27017/movies_db");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoBD"));
db.once("open", () => {
  console.log("Connecté à MongoBD");
});

// Mise à jour les chemins d'images après la connexion à MongoDB
mongoose.connection.once("open", async () => {
  console.log("Connecté à MongoBD avec succès.");
  await movieController.updateMoviesPath();
});

//-------------------MIDDLEWARE----------------------//

// Autoriser les requêtes CORS avant l'utilisation des routes !!!
app.use(cors());

app.use(bodyParser.json());
app.use("/", movieRouter);

//-------------------MIDDLEWARE----------------------//


app.listen(PORT, () => {
  console.log(`Le server en écoute sur le port ${PORT}`);
});