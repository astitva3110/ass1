const express=require('express');
const router=express.Router();
const postcontroller=require('../controllers/postcontroller.js');
const isLogin=require('../middleware/isLogin.js');
router.get('/update/:post_id',(req,res)=>{
    res.send("IT is foo");
})



//route for create post
router.post("/create/:user_id", isLogin, postcontroller.postPOST);

//route for get all the post
router.get("/AllPost/:user_id", isLogin, postcontroller.getAllPost);

//route to update post
router.put('/update/:post_id', isLogin, postcontroller.updatePost);

//route to delete post
// router.delete('/delete/:post_id', isLogin, postcontroller.deletePost);

// router for like the post 
router.post('/likePost/:post_id', isLogin, postcontroller.likePost);

//router to unlike the post 
router.post('/unlikePost/:post_id', isLogin, postcontroller.unlikePost);


module.exports=router;