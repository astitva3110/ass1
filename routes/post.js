const express=require('express');
const router=express.Router();
const postcontroller=require('../controllers/postcontroller.js');
const {isLogin}=require('../middleware/isLogin.js');


router.get('/create', isLogin,(req,res)=>{
    res.json("knded");
} )

//route for create post
router.post("/create", isLogin, postcontroller.postPOST);

// //route for get all the post
router.get("/AllPost/:user_id", isLogin, postcontroller.getAllPost);

// //route to update post
router.put('/update/:post_id', isLogin, postcontroller.updatePost);

 // router for like the post 
router.post('/likePost/:post_id', isLogin, postcontroller.likePost);

// //router to unlike the post 
router.post('/unlikePost/:post_id', isLogin, postcontroller.unlikePost);


module.exports=router;