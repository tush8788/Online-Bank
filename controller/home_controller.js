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
        req.flash('success',"Signout Successfully");
        return res.redirect('/');
    });
    
}