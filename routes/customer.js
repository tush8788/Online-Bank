const express=require('express');
const router=express.Router();
const customerController=require('../controller/customer_controller');
const passport=require('passport');

router.get('/signin',customerController.SignInPage);

router.get('/savingAccount',customerController.NewSavingAccount);

router.get('/testAccount',customerController.TestAccount)

router.post('/savingaccount',customerController.createSavingAccount);

router.post('/testaccount',customerController.createTestAccount);

router.post('/createsession',passport.authenticate('local',{failureRedirect:'/'}),customerController.createSession);

router.get('/dashboard',passport.checkAuthentication,customerController.Dashboard)

module.exports=router;