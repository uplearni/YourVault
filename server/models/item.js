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
        name: {
        type: String,
        required: function () {
           return this.type === "file";
        }
    },
      path: {
        type: String,
        required: function () {
        return this.type === "file";
      }
    },
       mimetype: {
       type: String,
       required: function () {
        return this.type === "file";
     }
    }
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