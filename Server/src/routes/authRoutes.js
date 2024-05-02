const express = require("express");
const isAuthenticated = require("../middlewares/authentication");
const authController = require("../controller/authController");

const router = express.Router();


// router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// router.get("/profile", isAuthenticated, authController.profile);

module.exports = router;