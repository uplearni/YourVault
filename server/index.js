const express=require("express");
const rootRouter= require("./routes/server");
const cors=require("cors")

const app=express();

app.use(cors());
app.use(express.json());
app.use("/",rootRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({ message });
});

app.listen(3000);