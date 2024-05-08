const mongoose=require('mongoose');

const postschema=new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    text:{
        type:String,
       required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    createdAt:{
        type:Date,
        default:Date.now
       },

},{timestamps:true})

const Post=mongoose.model('Post',postschema);

module.exports=Post;