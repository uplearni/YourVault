const jwt=require("jsonwebtoken");
const {JWT_SECRET} =require("../config");

exports.generatedAuthToken=(user)=>{
     const token=jwt.sign({
        email:user.email,
        userId:user._id
     },
    JWT_SECRET,
   {
      expiresIn:'7d'
   });

return token;
}