const express=require('express');
const router=express.Router();
const customerController=require('../controller/customer_controller');

router.get('/signin',customerController.SignInPage);

router.get('/savingAccount',customerController.NewSavingAccount);

router.get('/testAccount',customerController.TestAccount)

module.exports=router;