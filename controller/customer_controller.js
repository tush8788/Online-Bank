const CustomerDB=require('../models/customer');
const LoanDB=require('../models/loan');

//sigin in page
module.exports.SignInPage=function(req,res){
    if(req.user){
        return res.redirect('/customer/dashboard')
    }
    return res.render('./Customer/customerSignin',{
        title:"Customer Signin"
    })
}

//new saving account page
module.exports.NewSavingAccount=function(req,res){
    if(req.user){
        return res.redirect('/customer/dashboard')
    }
    return res.render('./Customer/CustomerSavingAccount',{
        title:"New Account"
    })
}

//new test account page
module.exports.TestAccount=function(req,res){
    if(req.user){
        return res.redirect('/customer/dashboard')
    }
    return res.render('./Customer/CustomerTestAccount',{
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
        // console.log(req.body);

            if(!customer){
                let customer=await CustomerDB.create(req.body);
                // console.log(customer);
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
                // console.log(customer);
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
module.exports.Dashboard=async function(req,res){
    // console.log("Dashboard");
    try{
        let loans=await LoanDB.find({user:req.user.id});
        return res.render('./Customer/CustomerDashboard',{
            title:"Dashboard",
            loan:loans
        })
    }
    catch(err){

    }
}

//deposite money page
module.exports.depositeMoneyPage=function(req,res){
    return res.render('./Customer/depositeMoney',{
        title:"Deposite"
    });
}

// deposite money
module.exports.depositeMoney=async function(req,res){
    try{
        let user = await CustomerDB.findById(req.body.userId);
        //check req user or login user is same or not
        if(req.user.id==user._id){    
           user.balance=parseInt(user.balance)+parseInt(req.body.depositeAmt);
           user.save();
           return res.redirect('back');
        }
        else{
            return res.redirect('/');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

// withdrawal money page
module.exports.withdrawalMoneyPage=function(req,res){
    return res.render('./Customer/withdrawalMoney',{
        title:"Withdrawal Ammount"
    })
}

// withdrawal money
module.exports.withdrawalMoney=async function(req,res){
    try{
        let user = await CustomerDB.findById(req.body.userId);
        //check req user or login user is same or not
        if(req.user.id==user._id){
            if(user.balance==0 || user.balance<=req.body.withdrawalAmt){
                console.log("insufficient amount to withdral");
                return res.redirect('back');
            }    
            
           user.balance=parseInt(user.balance)-parseInt(req.body.withdrawalAmt);
           user.save();
           return res.redirect('back');
        }
        else{
            return res.redirect('/');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//apply loan page
module.exports.applyLoanPage=function(req,res){
    return res.render('./Customer/applyLoanPage',{
        title:"Apply Loan"
    })
}

// apply loan
module.exports.ApplyLoan= async function(req,res){
    try{
        //check login user and req user is same or not 
        if(req.user.id!=req.body.userId){
            console.log("user Not Match");
            return res.redirect('/');
        }
        let newLoan;
        let LoanApplyList= await LoanDB.findOne({user:req.body.userId});
        if(!LoanApplyList || LoanApplyList.isReject==true){
            newLoan=await LoanDB.create({
                user:req.body.userId,
                LoanAmount:req.body.loanAmt   
            })
            // console.log(newLoan);
            return res.redirect('/customer/dashboard');
        }
        else{
            console.log("You have Already Apply loan");
            return res.redirect('/customer/dashboard');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('/');
    }
}

//convert test to saving account page
module.exports.convertToSavingPage=async function(req,res){
    return res.render('./Customer/convertToSaving',{
        title:"Convert To Saving"
    })
}

module.exports.convertToSaving=async function(req,res){
    try{
        console.log(req.body);
        req.body.isSaving=true;
        let user = await CustomerDB.findByIdAndUpdate(req.body.userId,req.body);
        return res.redirect('/customer/dashboard');

    }
    catch(err){
        console.log(err);
        return res.redirect('/customer/dashboard');
    }
}

module.exports.PaidLoanPage=async function(req,res){
    try{
        let Loan=await LoanDB.findById(req.params.loanId);
        let date=new Date(Loan.createdAt);
        let month=date.getMonth()+1;
        let Todaydate=new Date().getMonth()+1;

        let tMonth=Todaydate-month;
        if(tMonth==0){
            tMonth=1;
        }
        

        let AmmountNeedToPaid=(Loan.LoanAmount * Loan.RateOfIntrest * tMonth)/100

        return res.render('./customer/paidLoan',{
            title:"Loan Paid",
            Ammount:AmmountNeedToPaid,
            Loan:Loan

        })
    }
    catch(err){
        console.log(err);
        return res.redirect('/customer/dashboard');
    }
}

// loan paid
module.exports.PaidLoan=async function(req,res){
    try{
        let customer=await CustomerDB.findById(req.body.userId);
        if(req.user.id!=customer._id){
            console.log("user Not Match");
            return res.redirect('back');
        }
        
        //loan amount is greter then balance
        if(customer.balance<=req.body.loanAmt){
            console.log("insufficent Balance to pay loan");
            return res.redirect('/customer/dashboard');
        }

        //delete loan entry
       let Loan =await LoanDB.findById(req.body.loanId);
        //debit loan from balance
        customer.loanAmount=customer.loanAmount-Loan.LoanAmount;
        customer.balance-=req.body.loanAmt;
        customer.save();
        Loan.remove();

        return res.redirect('/customer/dashboard');
    }
    catch(err)
    {
        console.log(err);
        return res.redirect('/customer/dashboard');
    }
}