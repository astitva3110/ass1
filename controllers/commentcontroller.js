const mongoose=require('mongoose');
const User=require('../models/User');
const Post=require('../models/Post');
const Comment=require('../models/comment');


exports.addcomment=async(req,res)=>{
    const postId=req.params.post_id;
    const {user_id,text}=req.body;
    
    try{
        const post=await Post.findById(postId);
        if(!post){
            // res.status(404).json({messsge:"Post is not available"});
        }
        const newcomment=new Comment({
            user:user_id,
            text:text,
            post:postId
        })
        await newcomment.save();
        res.status(200).json({messsge:"Comment is added",newcomment});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
    }

exports.addReplies=async(req,res)=>{
    const commentId=req.params.comment_id;
    const {user_id,text}=req.body;
    console.log(req.body)
    try{
        const comment=await Comment.findById(commentId)
        const user=await User.findById(user_id);
        console.log(comment,user)
        if(!comment ||!user){
            res.status(404).json({message:"NOT FOUND"});
        }
        const replie={
            text,
            user:user_id
        }
        comment.replies.push(replie)
        await comment.save();
        res.status(200).json({messsge:"Replies is added",replie});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
}


exports.upadateComment=async(req,res)=>{
    const commentId=req.params.comment_id;
    const {user_id,text}=req.body;
    try{
       const user=await User.findById(user_id);
       const comment=await Comment.findById(commentId);
       if(!comment ||!user){
        res.status(404).json({message:"NOT FOUND"});
      }
      const comment_user=comment.user;
      if(user_id!=comment_user){
        res.status(500).json({message:"You can't update comment that You don't own!"}); 
      }
      comment.text=text;
      await comment.save();
      res.status(200).json({message:"Comment is updated successfully"}); 
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
       }
}