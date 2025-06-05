//does what cors does manually , getting more controle 
function setHeaders(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");//this allows request from every domain , * means we can access the api from any frontend
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );//we are allowing these methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}
module.exports = setHeaders;