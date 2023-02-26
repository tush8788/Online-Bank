const CustomerDB=require('../models/customer');

//sigin in page
module.exports.SignInPage=function(req,res){
    if(req.user){
        return res.redirect('/customer/dashboard')
    }
    return res.render('customerSignin',{
        title:"Customer Signin"
    })
}

//new saving account page
module.exports.NewSavingAccount=function(req,res){
    if(req.user){
        return res.redirect('/customer/dashboard')
    }
    return res.render('CustomerSavingAccount',{
        title:"New Account"
    })
}

//new test account page
module.exports.TestAccount=function(req,res){
    if(req.user){
        return res.redirect('/customer/dashboard')
    }
    return res.render('CustomerTestAccount',{
        title:"New Account"
    })
}

//create saving account
module.exports.createSavingAccount=async function(req,res){
    // console.log(req.body);
    try{
        // password and confirm password not match
        if(req.body.password != req.body.confirmpassword){
            console.log("Password and confirm passwprd not Match");
            return res.redirect('back');
        }
        // find customer already exist in db
        let customer=await CustomerDB.findOne({email:req.body.email});
        // let customer=await CustomerDB.aggregate({ 
        //     "$match":{
        //         email:req.body.email
        //        }
        //     }
        //      );
        req.body.isSaving=true;
        console.log(req.body);

            if(!customer){
                let customer=await CustomerDB.create(req.body);
                console.log(customer);
                return res.redirect('/customer/signin');
            }
            else{
                console.log("Customer already exist");
                return res.redirect('back');
            }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//create test account
module.exports.createTestAccount= async function(req,res){
    // console.log(req.body);
    try{
        if(req.body.password != req.body.confirmpassword){
            console.log("Password and confirm passwprd not Match");
            return res.redirect('back');
        }
        // find customer already exist in db
        let customer=await CustomerDB.findOne({email:req.body.email});
        // let customer=await CustomerDB.aggregate({ 
        //     "$match":{
        //         email:req.body.email
        //        }
        //     }
        //      );
        req.body.isSaving=false;
        // console.log(req.body);

            if(!customer){
                let customer=await CustomerDB.create(req.body);
                console.log(customer);
                return res.redirect('/customer/signin');
            }
            else{
                console.log("Customer already exist");
                return res.redirect('back');
            }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }

}

//create session
module.exports.createSession=function(req,res){
    return res.redirect('/customer/dashboard');
}

//dashboard
module.exports.Dashboard=function(req,res){
    // console.log("Dashboard");
    return res.render('CustomerDashboard',{
        title:"Dashboard"
    })
}

//signOut
module.exports.signOut=(req,res)=>{
    req.logout((err)=>{
        return res.redirect('/');
    });
    
}