const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors'); 


const app = express();
const PORT = process.env.PORT || 3000;

// Importation du contrôleur movieController
const movieController = require("./src/controller/movieController");


// Importation des routeurs d'authentification et de films
const authRouter = require("./src/routes/authRoutes");
const movieRouter = require("./src/routes/moviesRoutes");

//-------------------CONNECTION BDD----------------------//

mongoose.connect("mongodb://localhost:27017/movies_db");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoBD"));
db.once("open", () => {
  console.log("Connecté à MongoBD");
});
mongoose.connection.once("open", async () => {
  // console.log("Connecté à MongoBD avec succès.");
  await Promise.all([
    // Mise à jour les chemins d'images et des videos après la connexion à MongoDB
    movieController.updateMoviesPath(),
    movieController.updateVideoPath(),
  ]);
});

//-------------------CONNECTION BDD----------------------//



//-------------------MIDDLEWARE----------------------//

// Autoriser les requêtes CORS avant l'utilisation des routes !!!
app.use(cors()); // Cela autorise les requêtes CORS (Cross-Origin Resource Sharing), ce qui permet à serveur d'accepter les requêtes provenant de domaines différents. C'est particulièrement utile si on a une application frontend et une API backend 

app.use(bodyParser.json()); // Cela permet à l'application Express de comprendre les corps de requête au format JSON.

app.use("/auth", authRouter); // Routes d'authentification
app.use("/", movieRouter); // Routes des films

//-------------------MIDDLEWARE----------------------//


app.listen(PORT, () => {
  console.log(`Le server en écoute sur le port ${PORT}`);
});