import express from "express";
import mongoose from "mongoose";
import userRouter from "./Route/user.route.js";
import postRouter from "./Route/post.route.js";

import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).
then(()=>{
    console.log('connected to mongodb');
}).

catch((error)=>{
    console.log('error connecting mongodb:', error )
})


const app = express();

// to make every website understand the language of the web
app.use(express.json())


// this is the url to the database or the user
app.use("/api/v1/users", userRouter);

app.use("/api/v1/posts", postRouter);



const port = process.env.PORT || 5000



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})