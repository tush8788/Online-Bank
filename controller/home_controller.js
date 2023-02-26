module.exports.home=function(req,res){
    return res.render('home',{
        title:"Home Page"
    })
}

//signOut
module.exports.signOut=(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log(err);
        }
        return res.redirect('/');
    });
    
}