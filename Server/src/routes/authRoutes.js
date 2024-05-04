const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/signup", authController.signup);
router.get("/check-username/:username", authController.checkUsername);
router.get("/check-email/:email", authController.checkEmail);



module.exports = router;