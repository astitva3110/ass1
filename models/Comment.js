const mongoose=require('mongoose');
const User = require('./User'); 

const commentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    text:{
       type:String,
       required:true
    },
     replies:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        text:{
            type:String,
            required:true
         },

     }],
     likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],    
})


const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment;