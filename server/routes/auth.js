const express = require('express');
const authController=require("../controllers/auth");
const signupValidator =require("../middleware/validators");

const router = express.Router();

router.post("/signup",signupValidator,authController.signup);

router.post("/login",authController.login);

module.exports = router;