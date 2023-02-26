const EmployeeDB=require('../models/employee');

//signup page
module.exports.signUpPage=function(req,res){
    if(req.user){
        return res.redirect('/employee/dashboard')
    }
    return res.render('./employee/signup',{
        title:"SignUp"
    });
}

//signup 
module.exports.signUp=async function(req,res){
    try{
        if(req.body.password != req.body.ConfirmPassword){
            console.log("password and confirm password not match");
            return res.redirect('back');
        }
        let user = await EmployeeDB.findOne({email:req.body.email});
        if(!user){
            user=await EmployeeDB.create(req.body);
            return res.redirect('/employee/signinpage');
        }

        return res.redirect('/employee/signinpage');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//signin page
module.exports.signInPage=function(req,res){
    if(req.user){
        return res.redirect('/employee/dashboard')
    }
    return res.render('./employee/signin',{
        title:"SignIn"
    });
}

//signin 
module.exports.signIn=function(req,res){
    console.log("inside")
    return res.redirect('/employee/dashboard');
}

module.exports.dashboard=function(req,res){
    // console.log("come")
    return res.render('./employee/dashboard',{
        title:"Dashboard"
    });
}