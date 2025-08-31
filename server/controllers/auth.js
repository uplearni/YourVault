        const User=require("../models/user");
        const { generatedAuthToken } = require("../utils/auth-helper");
        const {throwError} =require("../utils/helper");
        const bcrypt=require("bcryptjs");

        exports.signup=async(req,res,next)=>{
            try{
                const name=req.body.name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
                const email=req.body.email;
                const password=req.body.password;
                const hashedpw=await bcrypt.hash(password,12);//hashing password

                //console.log("User signed up:", { name, email });
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
            //  console.log("attempting to login",email);
            const loadedUser=await User.findOne({email}); //finding the user

            if(!loadedUser) throwError("User not found",401);//if not found then send back error
            //if user exist then we check if the password is equal 
            const isEqual=await bcrypt.compare(password,loadedUser.password); // checking if the password is correct

            if(!isEqual) throwError("Wrong Password , Please Enter again",422); //check if wrong or not 

            const token=generatedAuthToken(loadedUser); //get token to send back

            res.status(201).json({ //sending back token 
                token:token,
                userId:loadedUser._id,
                name:loadedUser.name,
                email:loadedUser.email,
            });
            }catch(err){
                next(err);
            }
        }

        exports.showInfo=async(req,res,next)=>{
            const userId=req.userId;

            try{
                const user=await User.findOne({_id:userId});
                if(!user) throwError("No Info Found",401);
            const {password , ...userData}=user.toObject();//convert user to plain javascript object
            res.status(200).json({
                message:"Found User Info",
                data :userData
            })

            }catch(err){
                next(err);
            }
        }

