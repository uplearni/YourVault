//every error that is send by a request will be handled and displayed using this 
function sendErrorResponse(error,req,res,next){
    const status=error.statusCode || 500;
    const message=error.message;
    const data = error.data;
    res.status(status).json({
        message:message,
        data:data
    });
}

module.exports=sendErrorResponse;