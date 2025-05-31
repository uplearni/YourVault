const { Collection }= require("../models/collection");
const mongoose= require("mongoose");
const {throwError}= require("../utils/helper");


exports.getCollections=async (req,res,next)=>{
   const userId=req.userId;
   try{
    const collection=await Collection.find({createdBy:userId});
    res.status(200).json({
        message:"success",
        collection,
    })
    }catch(err){
     next(err);
    }
}

exports.createCollection=async (req,res,next)=>{
    const cname=req.body.cname;
    const description=req.body.description;
    
    try{
        if(!cname){
            throwError("Please enter a collection name",422);
        }
        const collection=new Collection({cname,description,createdBy:req.userId});
        const result= await collection.save();
        res.status(200).json({
            message:"Collection created Successfully",
            data:{
                id:result._id.toString(),
                collection:result.cname,
            }
        });
    }catch(err){
        next(err);
    }
}

exports.getCollectionById=async (req,res,next)=>{
    const collectionId = req.params.collectionId; // or rename this to collectionId for clarity

  try {
    if (!collectionId) throwError("Invalid collection ID provided.", 422);

    const data = await Collection.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(collectionId) },
      },
      {
        $lookup: {
          from: "items", // Collection name for Item model (Mongo auto-pluralizes it)
          let: { collectionId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$collectionId", "$$collectionId"] },
              },
            },
          ],
          as: "items",
        },
      },
    ]);

      if (!data || data.length === 0) throwError("Collection not found", 404);
      
    res.status(200).json({
      message: "Collection fetched successfully",
      data: data[0], 
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCollection=async (req,res,next)=>{
    const cname=req.body.cname;
    const description=req.body.description;
    const collectionId=req.params.collectionId;
    const userId=req.userId;

    try{
        const result=await Collection.findOneAndUpdate(
            {_id:collectionId,createdBy:userId},
            {cname,description},
            {new:true},
        )

        if(!result) throwError("Collection not found",404);

        res.status(200).json({
            message:"Collection found",
            data:result,
        })
    }catch(err){
        next(err);
    }
}

exports.deleteCollection=async (req,res)=>{
    const collectionId=req.params.collectionId;
    const userId=req.userId;

    try{
        const result=await Collection.deleteOne({_id:collectionId,createdBy:userId});
        if(result.deletedCount===0) throwError("no collection found",422);
        
        res.status(200).json({
            message:"Collection delete successfully",
        });
    }catch(err){
        next(err);
    }
}