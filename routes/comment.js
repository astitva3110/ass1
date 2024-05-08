const express=require('express');
const router=express.Router();
const commentcontroller=require('../controllers/commentcontroller')
const isLogin=require('../middleware/isLogin.js');
router.get('/add/:post_id',(req,res)=>{
    res.send("IT is foo")
})
//router post request for add commit 
router.post('/add/:post_id', isLogin, commentcontroller.addcomment);

// //router post request add replies
router.post('/addReplies/:comment_id', isLogin, commentcontroller.addReplies);

// //router update comment request 
router.put('/update/:comment_id', isLogin, commentcontroller.upadateComment);


module.exports=router;