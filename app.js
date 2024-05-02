const express=require('express');
const app=express();
require('dotenv').config();
const PORT=process.env.port||3000;
const authroute=require('./routes/auth');
const {connectdb}=require('./util/database');

connectdb();

app.use(express.json());
app.use('/auth',authroute);

app.listen(PORT,()=>{
    console.log("Server is running on ${PORT}");
})