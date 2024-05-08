const express=require('express');
const User=require('../models/User');
const Post = require('../models/Post');


//AppName for api
exports.postAppName=async(req,res)=>{
    const appname=req.body.appName;
    const userId=req.params.user_id;

    try{
        //Confiming the username is unique
        const name=await User.findOne({appName:appname})
        if(name){
            res.status(500).json({message:"app name is already taken"})
        }
        const user=await User.findById(userId);
        user.appName=appname;
        res.status(200).json({appname});        
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"internal server error"});
       }
}
