const jwt=require("jsonwebtoken");
const {throwError} =require("../utils/helper");
const { JWT_SECRET } = require("../config");

//verifying the user before letting them access other things
module.exports=(req,res,next)=>{
    const authHeader=req.get("Authorization");
    if(!authHeader) throwError("Not authenticated",401);

    const token=authHeader.split(" ")[1];
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,JWT_SECRET);
    }catch(error){
        throw error
    }

    if(!decodedToken) throwError("Not authenticated",401);
    req.userId = decodedToken.userId;
    req.email=decodedToken.email;
    next();
}