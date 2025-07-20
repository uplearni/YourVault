//imports
require('dotenv').config();
const express=require("express");//for routing
const { v2: cloudinary } = require('cloudinary');
const mongoose=require("mongoose");//for database
const sendErrorResponse=require("./controllers/sendErrorResponse");
const rootRouter= require("./routes/server"); //routes
const cors=require("cors")
const setHeaders=require("./middleware/headers")
const helmet=require("helmet");//secure headers

const app=express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
app.get("/test", (req, res) => res.json({ ok: true }));
app.use("/api",rootRouter);
app.use("/uploads", express.static("uploads"));

//handle error
app.use(sendErrorResponse);

//app.listen(4000, () => console.log("Test server running"));
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB ");
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server running on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

