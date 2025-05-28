const mongoose = require('mongoose'); //importing mongoose

//each schema maps to a collection in mongodb and that schema define the shape of that collection
const userSchema=new mongoose.Schema({
    name:{
        type : String,
        required : true
    } ,
    email:{
        type:String,
        required: true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }

})
//we need to convert our schema in a model which we can work with 
//by default mongoose add _id to our schema each new socument in the collection is
//added with an id and can be accessed with _id
//we can also overwrite with this : _id : Number 
//but then we have to set it oursevleves as mongdb need id , can also be disabled like- _id : false 
module.exports=mongoose.model("User",userSchema);