//imports
const express=require("express");//for routing
const mongoose=require("mongoose");//for database
const sendErrorResponse=require("./controllers/error");
const rootRouter= require("./routes/server"); //routes
const cors=require("cors")
const setHeaders=require("./middleware/headers")
const helmet=require("helmet");//secure headers

const app=express();

//middleware
//cors : browser block request from other domain like 3000 cant interact with 8000
//this security policy is called same origin policy , cors telly express to allow request 
//from other origin as in development frontend and backend run on different ports
app.use(cors()); //CORS: Cross Origin Resource Sharing

//Helmet: it protect our app from common web vulnerabilities by :
/*Hiding the X-Powered-By header
Setting a Content-Security-Policy
Preventing clickjacking
Protecting against XSS (Cross-Site Scripting)
*/
app.use(helmet());
app.use(setHeaders);

//this reads the body of the request and make it available to be accessible through req.body
app.use(express.json());
app.use("/",rootRouter);

//handle error
app.use(sendErrorResponse);

mongoose.connect(process.env.MONGO_URL).then(
    ()=>app.listen(process.env.PORT || 8080)
    ).catch((err)=>console.log(err));
