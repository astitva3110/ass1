const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT=process.env.port||3000;
const authRoute=require('./routes/auth');
const userRoute=require('./routes/user');
const postRoute=require('./routes/post')
const commentRoute=require('./routes/comment');
const {connectdb}=require('./util/database');

connectdb();

app.use(express.json());
app.use(cookieParser());

//auth route
app.use('/auth', authRoute);
//user route
app.use('/user', userRoute);
//post route
app.use('/post', postRoute);
//comment route
app.use('/comment', commentRoute);


app.listen(PORT,()=>{
    console.log("Server is running on ${PORT}");
})