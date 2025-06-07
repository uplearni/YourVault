const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        const ext=path.extname(file.originalname);
        cb(null,`${Date.now()}-${file.originalname}`);
    },
})

const upload=multer({
    storage
})

module.exports=upload;