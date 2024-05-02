const express=require('express');
const router=express.Router();
const authcontroller=require('../controllers/authcontroller')

//route for register
router.post('/signup',authcontroller.postSignup);

//route to check the otp
router.post('/otp',authcontroller.postOTP);

//route for login
router.post('/login',authcontroller.postLogin);

//router for forgot password
router.post('/forgot/:user_id',authcontroller.postForgot);

router.get('/signup',(req,res)=>{
    res.send("IT is foo")
})


module.exports=router;