const mongoose=require('mongoose');


const userschema=new mongoose.Schema({
  username :{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
appName:{
  type:String,
  default:""
},
password:{
    type:String,
    required:true
},
post:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
}]
},{timestamps:true})

const User=mongoose.model('User',userschema)

module.exports=User;