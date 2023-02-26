module.exports.SignInPage=function(req,res){
    return res.render('customerSignin',{
        title:"Customer Signin"
    })
}

module.exports.NewSavingAccount=function(req,res){
    return res.render('CustomerSavingAccount',{
        title:"New Account"
    })
}

module.exports.TestAccount=function(req,res){
    return res.render('CustomerTestAccount',{
        title:"New Account"
    })
}

//create saving account
module.exports.createSavingAccount=function(req,res){
    console.log(req.body);
}

//create test account
module.exports.createTestAccount=function(req,res){
    console.log(req.body);
    
}