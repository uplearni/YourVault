const multer=require("multer");
//const path=require("path");



const storage=multer.memoryStorage();//saving the file in ram buffer

const upload=multer({
    storage:storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    },
})

module.exports=upload;