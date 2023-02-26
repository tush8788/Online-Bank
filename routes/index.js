const express=require('express');
const router=express.Router();
const homeController=require('../controller/home_controller');

router.get('/',homeController.home);
router.get('/signout',homeController.signOut);

//customer
router.use('/customer',require('./customer'));
// employee
router.use('/employee',require('./employee'));

module.exports=router;