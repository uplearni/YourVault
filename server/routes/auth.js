const express = require('express');
const authController=require("../controllers/auth");//signup and login logic
const {signupValidator} =require("../middleware/validators");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post("/signup",signupValidator,authController.signup);

router.post("/login",authController.login);
router.get("/me",isAuth,authController.showInfo);
router.post('/logout',isAuth, (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;