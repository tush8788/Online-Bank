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
//signin
router.post('/signin',passport.authenticate('local',{failureRedirect:'/'}),employeeController.signIn);
//dashboard
router.get('/dashboard',passport.checkAuthentication,employeeController.dashboard);
//loan view page
router.get('/loan-view/:id',passport.checkAuthentication,employeeController.viewLoanPage);
//loan update
router.post('/updateloanstatus',passport.checkAuthentication,employeeController.loanUpdate)
module.exports=router;