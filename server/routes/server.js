const express=require("express");
const userRouter=require("./auth.js");
const collectionRouter= require("./collection.js");
const itemRouter= require("./item.js");


const router=express.Router();

router.use("/user",userRouter);
router.use("/collection",collectionRouter);
router.use("/item",itemRouter);

module.exports=router;