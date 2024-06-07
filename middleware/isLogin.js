const jwt=require("jsonwebtoken")
require('dotenv').config();

const isLogin=(req,res,next)=>{

    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ message: "Token not found" });
    }
    const token = auth.split(' ')[1];
    if(!token){
        res.status(404).json({message:"user is not login"})
    }
    try{
    const decoded=jwt.verify(token,process.env.JWT_KEY);
    req.user=decoded;
    next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({error:"Invalid token"});
    }
}



const genratetoken=(userdata)=>{
      return jwt.sign(userdata,process.env.JWT_KEY);
}



module.exports={isLogin,genratetoken};