const jwt=require("jsonwebtoken")
require('dotenv').config();

const isLogin=(req,res,next)=>{
    // console.log("Cookies:", req.cookies);
    const token=req.cookies && req.cookies.token
    if(!token){
        res.status(404).json({message:"user not login"})
    }
    jwt.verify(token,process.env.JWT_KEY,async(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({message:"token did not matched"})
        }
        next()
    })
}

module.exports=isLogin;