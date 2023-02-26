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

router.get('/dashboard',passport.checkAuthentication,customerController.Dashboard);

// money deposit page
router.get('/depositepage',passport.checkAuthentication,customerController.depositeMoneyPage)

//deposit money
router.post('/depositeMoney',passport.checkAuthentication,customerController.depositeMoney)

// withdrawal money page
router.get('/withdrawalpage',passport.checkAuthentication,customerController.withdrawalMoneyPage)
// withdrawal money 
router.post('/withdrawalMoney',passport.checkAuthentication,customerController.withdrawalMoney);
//apply loan page
router.get('/applyloanpage',passport.checkAuthentication,customerController.applyLoanPage);

router.post('/loan',passport.checkAuthentication,customerController.ApplyLoan);

module.exports=router;