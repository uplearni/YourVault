const {Item}=require("../models/item");
const {throwError}=require("../utils/helper");
// const mongoose=require("mongoose");

exports.createItem=async (req,res,next)=>{
    const {title,description,type,url,collectionId} =req.body;
    const file=req.file;

    try{
        if(!type || !["url","file"].includes(type)){
            throwError("Invalid type",422);
        }

        if(!collectionId) throwError("Collection Id is required",422);

        let itemData={
            title,
            description,
            type,
            collectionId,
        };

        if(type==="url"){
            if(!url) throwError("you need to enter a url",422);
        }else if(type==="file"){
            if(!file) throwError("a file is required to attach" , 422);
            
            itemData.file={
            name:file.name,
            path:file.path,
            mimetype:file.mimetype,
           };
        }
        
        const newItem=new Item(itemData);
        const savedItem=await newItem.save();

        res.status(200).json({
            message:"Item saved successfully",
            data:savedItem,
        });
    }catch(err){
        next(err);
    }
}

exports.updateItem=async (req,res,next)=>{
    const itemId=req.params.itemId;
    const {title,description,type,url}=req.body;

}

exports.getItemById = async (req, res, next) => {
  const itemId = req.params.itemId;
  try {
    if (!itemId) throwError("Item ID is required", 422);

    const item = await Item.findById(itemId);
    if (!item) throwError("Item not found", 404);

    res.status(200).json({
      message: "Item fetched successfully",
      data: item,
    });
  } catch (err) {
    next(err);
  }
};


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