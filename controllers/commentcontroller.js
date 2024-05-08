const mongoose=require('mongoose');
const User=require('../models/User');
const Post=require('../models/Post');
const Comment=require('../models/comment');



//add comment 
exports.addcomment=async(req,res)=>{
    const postId=req.params.post_id;
    const {user_id,text}=req.body;
    
    try{
        //fetching the post info
        const post=await Post.findById(postId);
        //if post is no present
        if(!post){
            res.status(404).json({messsge:"Post is not available"});
        }

        //creating a new comment
        const newcomment=new Comment({
            user:user_id,
            text:text,
            post:postId
        })
        //saving the data
        await newcomment.save();
        res.status(200).json({messsge:"Comment is added",newcomment});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
    }

    //add replies
exports.addReplies=async(req,res)=>{
    const commentId=req.params.comment_id;
    const {user_id,text}=req.body;

    try{
       // fetching the user and comment info
        const comment=await Comment.findById(commentId)
        const user=await User.findById(user_id);
        //if comment and user not exist
        if(!comment &&!user){
            res.status(404).json({message:"NOT FOUND"});
        }
        //new replies
        const replie={
            text,
            user:user_id
        }

        //saving the data
        comment.replies.push(replie)
        await comment.save();
        res.status(200).json({messsge:"Replies is added",replie});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
}

//update comment
exports.upadateComment=async(req,res)=>{
    const commentId=req.params.comment_id;
    const {user_id,text}=req.body;

    try{
        //fetching the user and comment info
       const user=await User.findById(user_id);
       const comment=await Comment.findById(commentId);
       //if comment and user not exist
       if(!comment ||!user){
        res.status(404).json({message:"NOT FOUND"});
      }

      const comment_user=comment.user;
      //checking the authorization
      if(user_id!=comment_user){
        res.status(500).json({message:"You can't update comment that You don't own!"}); 
      }
      //saving the user info
      comment.text=text;
      await comment.save();
      res.status(200).json({message:"Comment is updated successfully",comment:comment}); 
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
}