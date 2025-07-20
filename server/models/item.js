const mongoose=require("mongoose");

const itemSchema=new mongoose.Schema({
    type:{
        type:String,//what kind of item is this 
        enum:["url","file"],//this can be file or a url 
        required:true,
    },
    title:String,
    description:String,

    url:{
        type:String,
        required:function(){
            return this.type=="url";
        },
    },

     file: {
        // Updated for Cloudinary
        public_id: { // Cloudinary public ID for the file
            type: String,
            required: function () {
                return this.type === "file";
            }
        },
        secure_url: { // Cloudinary secure URL for the file
            type: String,
            required: function () {
                return this.type === "file";
            }
        },
        original_name: { // Store the original name for display purposes if needed
            type: String,
            required: function () {
                return this.type === "file";
            }
        },
        mimetype: { // Keep mimetype if useful
            type: String,
            required: function () {
                return this.type === "file";
            }
        },
        // You might also want to store other properties like size, format, etc.
    },

    collectionId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Collection",
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now,
    },

})

module.exports=mongoose.model("Item",itemSchema,"items");