const {Item}=require("../models/item");
const {throwError}=require("../utils/helper");
// const mongoose=require("mongoose");

exports.createItem=async (req,res,next)=>{
    const {title,description,type,url,collectionId}=req.body;
    try{
        if(!type || !collectionId) throwError("type and collection id are needed",422);
        let itemData={
        type,title,description,collectionId,
       };

       if(type==='url'){//if type is url check if it is given
         if(!url) throwError("you need to provide a url",422);
         itemData.url=url;
       }

       if(type==='file'){
          if(!req.file) throwError("File is required",422);
          itemData.file = {
          name: req.file.originalname,
          path: req.file.path,
          mimetype: req.file.mimetype,
         };
       }

       const item=new Item(itemData);
       const result=await Item.save();

       res.status(200).json({
        message: "new item added",
        data:item
       })
       
    }catch(err){
        next(err);
    }
}

//type cant be changes
exports.updateItem=async (req,res,next)=>{
   const { title, description } = req.body;
  const itemId = req.params.itemId;

  try {
    const item = await Item.findById(itemId);
    if (item.type === "url" && url) item.url = url;
    item.title = title || item.title;
    item.description = description || item.description;

    const updatedItem = await item.save();
    res.status(200).json({ message: "Item updated", item: updatedItem });
  } catch (err) {
    next(err);
  }
};   

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