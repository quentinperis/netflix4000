const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { isAuthenticated } = require("../middlewares/authentication"); 

router.post("/signup", authController.signup);
router.get("/check-username/:username", authController.checkUsername);
router.get("/check-email/:email", authController.checkEmail);
router.post("/login", authController.login);


// Middleware pour restreindre l'accès aux routes de films
router.use(isAuthenticated); 

// vérification du token JWT
router.get("/user-details", authController.getUserDetails);


module.exports = router;