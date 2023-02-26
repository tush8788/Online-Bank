const express=require('express');
const router=express.Router();
const passport=require('passport');
const employeeController=require('../controller/employee_controller');

//signUp page
router.get('/signuppage',employeeController.signUpPage)

//signUp 
router.post('/signup',employeeController.signUp);

//signin page
router.get('/signinpage',employeeController.signInPage)

router.post('/signin',passport.authenticate('local',{failureRedirect:'/'}),employeeController.signIn);
module.exports=router;