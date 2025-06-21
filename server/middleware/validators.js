const zod=require("zod");
const User=require("../models/user");

//defining signUp body 
const signupBody=zod.object({
     name:zod.string(),
     email:zod.string().email(),
     password:zod.string().min(6),
})

//function that validate if the req body is according to whats defined
exports.signupValidator= async (req,res,next)=>{
  const result=signupBody.safeParse(req.body);
  if(!result.success){
     return res.status(411).json({
        message:"Enter valid feilds",
        issues:result.error.errors
     })
  }   

  const existingUser=await User.findOne({email:req.body.email});
  if(existingUser){
        return res.status(409).json({
         message:"email already taken"
        })
  }
  
  next();
} 

