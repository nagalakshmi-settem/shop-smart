const express = require("express");
const router = express.Router();
const {register,login,refreshToken,googleLogin} = require("../controllers/authController")
router.post("/register", register)
router.post("/login",login)
router.post("/google", googleLogin);
router.post("/refresh-token",refreshToken)
module.exports = router;