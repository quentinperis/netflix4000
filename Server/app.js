const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const movieRouter = require("./src/routes/moviesRoutes");

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect("mongodb://localhost:27017/movies_db");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoBD"));
db.once("open", () => {
  console.log("Connecté à MongoBD");
});

//-------------------MIDDLEWARE----------------------//
app.use(bodyParser.json());
app.use("/", movieRouter);


app.listen(PORT, () => {
  console.log(`Le server en écoute sur le port ${PORT}`);
});