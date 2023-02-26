const EmployeeDB=require('../models/employee');

//signup page
module.exports.signUpPage=function(req,res){
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
    return res.render('./employee/signin',{
        title:"SignIn"
    });
}

//signin 
module.exports.signIn=function(req,res){
    return res.redirect('/employee/dashboard');
}