const mongoose=require("mongoose");
const {Schema} =mongoose

const collectionSchema=new mongoose.Schema({
   cname:{
    type:String,
    required:true
   },
   description:String,
   isFavorite:{
      type:Boolean,
      default:false,
   },
   createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
   createdAt:{
    type:Date,
    default:Date.now,
   }
})

module.exports=mongoose.model("Collection",collectionSchema);