exports.throwError=(message,code)=>{
    const error=new Error(message);
    error.statusCode=code;
    throw error;
}