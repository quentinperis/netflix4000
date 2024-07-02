const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 3000;
const uriMongoDb = process.env.MONGODB_URI;

// Importation du contrôleur movieController
const movieController = require("./src/controller/movieController");

// Importation des routeurs d'authentification et de films
const authRouter = require("./src/routes/authRoutes");
const movieRouter = require("./src/routes/moviesRoutes");

//-------------------CONNECTION BDD----------------------//

mongoose.connect(uriMongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoBD"));
db.once("open", () => {
  console.log("Connecté à MongoBD");
});

db.once("open", async () => {

  await Promise.all([
    // Mise à jour les chemins d'images et des videos après la connexion à MongoDB
    movieController.updateMoviesPath(),
    movieController.updateVideoPath(),
  ]);
});

//-------------------MIDDLEWARE----------------------//

// Autoriser les requêtes CORS avant l'utilisation des routes !!!
app.use(cors({
  origin: 'https://netflix-front-gxv920u03-natabouds-projects.vercel.app'
}));

// Cela autorise les requêtes CORS (Cross-Origin Resource Sharing), ce qui permet à serveur d'accepter les requêtes provenant de domaines différents. C'est particulièrement utile si on a une application frontend et une API backend 

app.use(bodyParser.json()); // Cela permet à l'application Express de comprendre les corps de requête au format JSON.

app.use("/auth", authRouter); // Routes d'authentification
app.use("/", movieRouter); // Routes des films

app.listen(PORT, () => {
  console.log(`Le server en écoute sur le port ${PORT}`);
});