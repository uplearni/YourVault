const Collection = require("../models/collection");
const mongoose= require("mongoose");
const {throwError}= require("../utils/helper");


exports.getCollections=async (req,res,next)=>{
   const userId=req.userId;//get user id 
   try{
    //search it in collection through created by
    const collection=await Collection.find({createdBy:userId});
    res.status(200).json({//send back collection
        message:"success",
        collection,
    })
    }catch(err){
     next(err);
    }
}

exports.createCollection=async (req,res,next)=>{
  //getting data to create
    const cname=req.body.cname;
    const description=req.body.description;
    
    try{
        if(!cname){
            throwError("Please enter a collection name",422);
        }
        //create collection
        const collection=new Collection({cname,description,createdBy:req.userId});
        const result= await collection.save();//save them
        res.status(201).json({
            message:"Collection created Successfully",
            data:{
                id:result._id.toString(),
                collection:result.cname,
                description:result.description,
            }
        });
    }catch(err){
        next(err);
    }
}

//get one collection by its id 
//get all items in that collection
//in sql: 
/*S
SELECT * FROM collections
JOIN items ON items.collectionId = collections._id
WHERE collections._id = :collectionId
*/
//but in mongodb we dont get joins so we use aggregation pipeline
exports.getCollectionById=async (req,res,next)=>{
    const collectionId = req.params.collectionId; 

  try {
    if (!collectionId) throwError("Invalid collection ID provided.", 422);

    const data = await Collection.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(collectionId) },//same as _id:collectionId but mongodb doesnt use _id as String 
      },
      {
        //join the collection with its respective items
        $lookup: {//used as JOIN , tells mongodb to look in Item Collections
          from: "items", // Collection name for Item model (Mongo auto-pluralizes it)
          let: { collectionId: "$_id" }, //store current collection id in $_id
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

//another way would be find collection Id and then find items with that collectionId but that would take two rounds

exports.updateCollection=async (req,res,next)=>{
    const cname=req.body.cname;
    const description=req.body.description;
    const collectionId=req.params.collectionId;
    const userId=req.userId;

    try{
        const result=await Collection.findOneAndUpdate(
            {_id:collectionId,createdBy:userId},//find and user can update their own collection
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

exports.deleteCollection=async (req,res,next)=>{
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