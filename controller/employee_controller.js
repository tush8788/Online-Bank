const EmployeeDB=require('../models/employee');
const CustomerDB=require('../models/customer');
const LoanDB=require('../models/loan');

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
    return res.redirect('/employee/dashboard');
}

//dashboard
module.exports.dashboard=async function(req,res){
    try{
        // customer list
        let CustomerList=await CustomerDB.find({}); 
        // loan list
        let LoanList=await LoanDB.find({}).populate('user');

        return res.render('./employee/dashboard',{
            title:"Dashboard",
            CustomerList:CustomerList,
            LoanList:LoanList
        });
    }
    catch(err){
        
    }
}

//view loan page
module.exports.viewLoanPage= async function(req,res){
    try{
        let Loan=await LoanDB.findById(req.params.id).populate('user');
        return res.render('./employee/viewLoanPage',{
            title:"Loan Update",
            Loan:Loan
        });
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//loan update
module.exports.loanUpdate=async function(req,res){
    // console.log(req.body);
    try{
        //update loan
        let Loan = await LoanDB.findByIdAndUpdate(req.body.loanId,{
            isApprove:req.body.isApprove,
            RateOfIntrest:req.body.RateOfIntrest,
            isReject:req.body.isReject
        });

        
        //update user balance
        let customer=await CustomerDB.findById(req.body.userId);
        customer.balance=parseInt(customer.balance)+parseInt(Loan.LoanAmount);
        customer.loanAmount=parseInt(customer.loanAmount)+parseInt(Loan.LoanAmount);
        customer.save();
        return res.redirect('/employee/dashboard');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

