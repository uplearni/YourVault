const zod=require("zod");

const signupBody=zod.object({
     name:zod.string(),
     email:zod.string().email(),
     password:zod.string(),
})

exports.signupValidator= async (req,res,next)=>{
  const result=signupBody.safeParse(req.body);
  if(!result.success){
     return res.status(411).json({
        message:"Email already taken / incorrect Email"
     })
  }   
  next();
} 

