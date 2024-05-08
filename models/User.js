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
profile_picture:{
    type:String,
    default:""
},
follower:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
}],
following:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
}],
post:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
}]
},{timestamps:true})

const User=mongoose.model('User',userschema)

module.exports=User;