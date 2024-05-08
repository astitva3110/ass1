const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const {connectdb }= require('../util/database');
require('dotenv').config();

connectdb();



//Create the post for a user 
exports.postPOST=async(req,res)=>{
  const {text}=req.body
  const user_id=req.params.user_id; 
  try{
    const user =await User.findById(user_id);
    if (!user){
     res.status(404).json({message:"user not found"});
    }
     const newPost=new Post({
        name:user_id,
        text
     })
    await newPost.save();
     user.post.push(newPost._id);
     await user.save();
     res.status(200).json(newPost);
     
  }
 catch(err){
            console.error(err);
            res.status(500).json({message:"Internal Server Error"});
           }
        }



  //get the all the post of users which is following by the user
    exports.getAllPost=async(req,res)=>{
       const userId=req.params.user_id;
       try{
        const user=await User.findById(userId);

        if(!user){
         res.status(404).json({message:"user is not found"});
        }
        const postsfromUser= await Post.find({ name: { $in: user.followers } })
       .sort({ createdAt: -1 })
       .populate('name', 'name');
        
       if(!postsfromUser){
         res.status(404).json({message:"NO post is available"});
       }
       res.status(200).json(postsfromUser.text);
       }
       catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
    }


    //update a post 
    exports.updatePost=async(req,res)=>{
        const {userId,newText}=req.body;
        const postId=req.params.post_id;

        try{
            const post=await Post.findById(postId);

            if(!post){
                 res.status(404).json({message:"Post Not Found"});
            }
            if(userId!=post.name){
                 res.status(500).json({message:"You Are Not Authorized "});
            }
            post.text=newText;
            post.save();
            res.status(200).json({message:"Post Is Updated"});
        }
        catch(err){
            console.error(err);
            res.status(500).json({message:"Internal Server Error"});
           }

    }



    exports.delete=async(req,res)=>{
      const postId = req.params.post_id;

      try {
        
            await Post.findByIdAndDelete(postId);
  
          res.status(200).json({ message: "Post deleted successfully" });
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
      }
        
    }

    //like a post
    exports.likePost=async(req,res)=>{
      const userId=req.body.user_id; 
      const postId=req.params.post_id;
      try{
      const user=await User.findById(userId);
      const post=await Post.findById(postId);
     
    
    
      if(!post){
        res.status(404).json({message:"Post id not found"});
      }
       post.likes.push(user._id);
       await post.save();
       res.status(200).json({message:"post is liked"});
      
      }
       catch(err){
                 console.error(err);
                 res.status(500).json({message:"internal Server Error"});
                }
     }

     exports.unlikePost=async(req,res)=>{
      const userId=req.body.user_id; 
      const postId=req.params.post_id;
      try{
      const user=await User.findById(userId);
      const post=await Post.findById(postId);
     
    
    
      if(!post){
        res.status(404).json({message:"Post id not found"});
      }
      if(!post.likes.includes(userId)){
        res.status(500).json({message:"the is not liked"});
      }
       post.likes.pull(post._id);
       await user.save();
       res.status(200).json({message:"post  is unliked"});
      
      }
       catch(err){
                 console.error(err);
                 res.status(500).json({message:"internal Server Error"});
                }
     }