const Item=require("../models/item");
const Collection=require("../models/collection")
const {throwError}=require("../utils/helper");
const { v2: cloudinary } = require('cloudinary');
// const mongoose=require("mongoose");

exports.getItems=async(req,res,next)=>{
  try {
    const userId = req.userId;
    const {collectionId}=req.query;

    if(!collectionId){
      return res.status(400).json({message:"collection ids are required"})
    }
     const collection = await Collection.findOne({ _id: collectionId, createdBy: userId });
     
    if (!collection) {
      return res.status(403).json({ message: "Access denied to this collection" });
    }

    const items = await Item.find({ collectionId });
    res.status(200).json({ message: "Items fetched", data: items });
  } catch (err) {
    next(err);
  }
};

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

          // Use Promises with upload_stream for cleaner async/await
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'YourVault', // Your desired Cloudinary folder
                        resource_type: 'auto', // Automatically detect file type (image, video, raw)
                        public_id: `file_${Date.now()}` // Optional: unique public ID
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                // Pipe the file buffer from Multer to Cloudinary's upload stream
                uploadStream.end(req.file.buffer);
            });

            if (!uploadResult || !uploadResult.secure_url) {
                throwError("File upload to Cloudinary failed", 500);
            }

           itemData.file = {
                public_id: uploadResult.public_id,
                secure_url: uploadResult.secure_url,
                original_name: req.file.originalname, // Multer provides this
                mimetype: req.file.mimetype,
            };
       }
       const item=new Item(itemData);
       const result=await item.save();

       res.status(201).json({
        message: "new item added",
        data:result
       })
       
    }catch(err){
        next(err);
    }
}

//type cant be changes
exports.updateItem=async (req,res,next)=>{
   const { title, description , url } = req.body;
  const itemId = req.params.itemId;

  try {
    const item = await Item.findById(itemId);
     if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.title = title || item.title;
    item.description = description || item.description;

    if (item.type === "url" && url) item.url = url;

    if (item.type === "file") {
            if (req.file) { // If a new file is uploaded
                // Delete the old file from Cloudinary if one exists
                if (item.file && item.file.public_id) {
                    await cloudinary.uploader.destroy(item.file.public_id);
                }

                
                const uploadResult = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'YourVault',
                            resource_type: 'auto',
                            public_id: `file_${Date.now()}` // New public ID for the new file
                        },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );
                    uploadStream.end(req.file.buffer);
                });

                if (!uploadResult || !uploadResult.secure_url) {
                    throwError("File upload to Cloudinary failed during update", 500);
                }

                item.file = {
                    public_id: uploadResult.public_id,
                    secure_url: uploadResult.secure_url,
                    original_name: req.file.originalname,
                    mimetype: req.file.mimetype,
                };
                
            }
            // If item.type is "file" but no new file is uploaded (req.file is undefined),
            // the existing item.file data is preserved.
        }

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
        
        const item = await Item.findById(itemId);
        if (!item) throwError("Item not found", 404);

        if (item.type === 'file' && item.file && item.file.public_id) {
            await cloudinary.uploader.destroy(item.file.public_id); // Delete from Cloudinary
        }

        const result=await Item.deleteOne({_id:itemId});

        if(result.deletedCount===0) throwError("item not found",404);
        res.status(200).json({
            message:"item deleted"
        })

    }catch(err){
        next(err);
    }
}