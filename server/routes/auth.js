const express = require('express');

const router = express.Router();

router.post("/signup",(req,res)=>{
    res.status(200).json({
        mssg:"sign up succesfull"
    })
});

router.post("/login",(req,res)=>{
    res.status(300).json({
        mssg:"log in succesfull"
    })
})

module.exports = router;