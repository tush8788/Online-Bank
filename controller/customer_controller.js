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

