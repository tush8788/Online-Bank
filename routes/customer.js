const express=require('express');
const router=express.Router();
const customerController=require('../controller/customer_controller');
const passport=require('passport');
//signin page
router.get('/signin',customerController.SignInPage);
// saving account page
router.get('/savingAccount',customerController.NewSavingAccount);
// test account page
router.get('/testAccount',customerController.TestAccount)
// saving account
router.post('/savingaccount',customerController.createSavingAccount);
// test account
router.post('/testaccount',customerController.createTestAccount);
//signIn
router.post('/createsession',passport.authenticate('local',{failureRedirect:'/'}),customerController.createSession);
//dashboard
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
//loan
router.post('/loan',passport.checkAuthentication,customerController.ApplyLoan);
//convert into Saving page
router.get('/convertintoSavingpage',passport.checkAuthentication,customerController.convertToSavingPage);
// test convert to saving
router.post('/convertinsaving',passport.checkAuthentication,customerController.convertToSaving)
//loan paid page
router.get('/paidloan/:loanId',passport.checkAuthentication,customerController.PaidLoanPage);
//loan paid 
router.post('/paidLoan',passport.checkAuthentication,customerController.PaidLoan)
module.exports=router;