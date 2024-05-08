const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config();


//Create the post for a user 
exports.postPOST=async(req,res)=>{
  const {text}=req.body
  const user_id=req.params.user_id; 
  try{
    //fetching th user info
    const user =await User.findById(user_id);

    
    if (!user){//if user is not found
     res.status(404).json({message:"user not found"});
    }
    // creating the post
     const newPost=new Post({
        name:user_id,
        text
     })

     //saving the post 
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

        //fetching the user info
        const user=await User.findById(userId);
        const post=await Post.find();

        //if user is no present
        if(!user){
         res.status(404).json({message:"user is not found"});
        }

       //sending the all the post
       res.status(200).json(post.text);
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

            //if post is no present
            if(!post){
                 res.status(404).json({message:"Post Not Found"});
            }

            //if Unauthorized user access this
            if(userId!=post.name){
                 res.status(500).json({message:"You Are Not Authorized "});
            }

            //updating the post
            post.text=newText;
            post.save();
            res.status(200).json({message:"Post Is Updated",Post:post});
        }
        catch(err){
            console.error(err);
            res.status(500).json({message:"Internal Server Error"});
           }

    }


    //delete the post
    exports.delete=async(req,res)=>{
      const postId = req.params.post_id;

      try {
            //find the post and delte the post
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
        //fetching the user and post info
         const user=await User.findById(userId);
         const post=await Post.findById(postId);
  
         //if post is no present
         if(!post){
            res.status(404).json({message:"Post id not found"});
        }

        //pushing the userID
         post.likes.push(user._id);
         await post.save();
         res.status(200).json({message:"post is liked",Post:post});
      
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
           //fetching the user and post
          const user=await User.findById(userId);
          const post=await Post.findById(postId);
    
          //if post is no present
          if(!post){
             res.status(404).json({message:"Post id not found"});
          }

          //if user not liked that post
          if(!post.likes.includes(userId)){
              res.status(500).json({message:"the is not liked"});
          }
          //pulling the userId 
         await post.likes.pull(userId);
          await user.save();
          res.status(200).json({message:"post  is unliked" ,Post:post});
      
      }
       catch(err){
                 console.error(err);
                 res.status(500).json({message:"internal Server Error"});
                }
     }