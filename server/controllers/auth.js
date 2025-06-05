const User=require("../models/user");
const { generatedAuthToken } = require("../utils/auth-helper");
const {throwError} =require("../utils/helper");
const bcrypt=require("bcryptjs");

exports.signup=async(req,res,next)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        const hashedpw=await bcrypt.hash(password,12);//hashing password

        const user=new User({//creating object
            name:name,
            email:email,
            password:hashedpw,
        });

        const result=await user.save();//saving to collection
        res.status(201).json({//sending back id and name
            userId:result._id,
            name:result.name,
        })
    }catch(err){
        next(err);
    }
}

exports.login=async(req,res,next)=>{
    const password=req.body.password;
    const email=req.body.email;
    try{
       const loadedUser=await User.findOne({email}); //finding the user

       if(!loadedUser) throwError("User not found",401);//if not found then send back error
       const isEqual=await bcrypt.compare(password,loadedUser.password); // checking if the password is correct

       if(!isEqual) throwError("wrong password",401); //check if wrong or not 

       const token=generatedAuthToken(loadedUser); //get token to send back

       res.status(200).json({ //sending back token 
        token:token,
        userId:loadedUser._id,
        name:loadedUser.name,
       });
    }catch(err){
        next(err);
    }
}