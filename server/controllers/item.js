const {Item}=require("../models/item");
const {throwError}=require("../utils/helper");
const mongoose=require("mongoose");

exports.createItem=async(req,res,next)=>{
    const {title,description,url,collectionId,file} =req.body;
}

exports.updateItem=async(req,res,next)=>{
    
}

exports.deleteItem=async(req,res,next)=>{
    const itemId=req.params.itemId;
    try{
        if(!itemId) throwError("item is invalid",422);

        const result=await Item.deleteOne({_id:itemId});

        if(result.deleteCount===0) throwError("item not found",404);
        res.status(200).json({
            message:"item deleted"
        })

    }catch(err){
        next(err);
    }
}