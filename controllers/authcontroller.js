const express=require('express');
const User=require('../models/User')
const {connectdb}=require('../util/database');
const bcrypt=require('bcrypt');
require('dotenv').config();
const { Resend } =require('resend');
const resend = new Resend(process.env.Resend);

connectdb();


//function for grenerating the otp
const OtpCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

// function to send the email 
  async function sendEmail(email, otp) {
    try {
     
      await resend.emails.send({
        from:'onboarding@resend.dev',
        to: email,
        subject: 'Your OTP for Verification',
        html: `<p>Your One-Time Password (OTP) for verification is:<strong>${otp}</strong></p>`
      });
      console.log("Email sent successfully to", email);
      return true; 
    } catch (error) {
      console.error("Error sending email:", error);
      return false; 
    }
  }
    

//post request for signup
exports.postSignup=async(req,res)=>{
  const{email,username,password}=req.body;
    try{
        const salt=await bcrypt.genSalt(10);
        const hass=await bcrypt.hash(password,salt);
        const otp = OtpCode();
        sendEmail(email,otp);
        const newUser=new User({
            username:username,
            email:email,
            password:hass,
            otp:otp,
        })
        await newUser.save();
        res.status(200).json(newUser);
    }
    catch(err){
        console.error(err);
    }
}

//post request for login 
exports.postLogin=async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(user){
    const confirmPassword=await bcrypt.compare(req.body.password,user.password);
    if(confirmPassword){
        res.status(200).json({message:'user is login'})
    }
    else{
        res.status(400).json({message:'password is incorrect'});
    }
    }
    else{
        res.status(404).json({message:'User is not found'});
    }
}


//post request for checjk the otp
exports.postOTP=async(req,res)=>{
    try {
        const {otp} = req.body;
    
        const user = await User.findOne({otp});
        console.log({otp});
        if (!user) {
          return res.status(404).json({message:"User is not found"});
        }
    
        user.verified = true;
        await user.save();
    
        res.status(200).json({message:"User is registered"});
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}


//post request for forgot password
exports.postForgot=async(req,res)=>{
    const {confirmPassword,password}=req.body;
    const userId=req.params.user_id;
    const user=await User.findById(userId);

    try{
      if (confirmPassword!=password){
        res.status(500).json({message:"Your confrim password and password should matched"});
      }
      const salt=await bcrypt.genSalt(10);
      const hass=await bcrypt.hash(password,salt);
      
      user.password=hass;
      await user.save()
      res.status(200).json({messgage:"Your passoword is updated"});

    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}