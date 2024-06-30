const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { isAuthenticated } = require("../middlewares/authentication"); 

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/check-username/:username", authController.checkUsername);
router.get("/check-email/:email", authController.checkEmail);

// vérification du token JWT
router.get("/user-details", isAuthenticated, authController.getUserDetails);

module.exports = router;