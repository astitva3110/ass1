const express=require('express');
const router=express.Router();
const usercontroller=require('../controllers/usercontroller');
const isLogin=require('../middleware/isLogin');

//app name
router.post('/username/:user_id', isLogin, usercontroller.postAppName);


module.exports=router;