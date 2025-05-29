const express=require("express");
const rootRouter= require("./routes/server");
const cors=require("cors")

const app=express();

app.use(cors());
app.use(express.json());
app.use("/",rootRouter);

app.listen(3000);