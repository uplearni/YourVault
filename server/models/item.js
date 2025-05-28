const mongoose=require("mongoose");

const itemSchema=new mongoose.Schema({
    type:{
        type:String,
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

    file:{
        name:String,
        path:String,
        mimetype:String,//fileType
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

module.exports=mongoose.model("Item",itemSchema);