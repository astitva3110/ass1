const express=require('express');
const mongoose =require('mongoose');
require('dotenv').config();

const connectdb=()=>{
    mongoose.connect(process.env.MONGODB_URI,)
    .then(result=>{
        console.log("connected to database")
    })
    .catch(err=>{
        console.log(err);
    })
}
module.exports={connectdb};