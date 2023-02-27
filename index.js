const express=require('express');
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
const passport=require('passport');
const localStretegy=require('./config/passport-local-stretegy');
const expressSession=require('express-session');
const mongoStrore=require('connect-mongo');
const connectFlash=require('connect-flash');
const Flash=require('./config/Notification');
const port=process.env.PORT||8000

const app=express();

app.set('view engine','ejs');
app.set('views','./views');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.urlencoded({extended:false}));
app.use(expressLayout);

app.use(expressSession({
    name:"User_id",
    secret:"AnyKey",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*100*100
    },
    store: mongoStrore.create({
        mongoUrl:"mongodb://localhost/ippopay-assignment",
        autoRemove:false
    },function(err){
        console.log(err||console.log("Connect"));
    }) 
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());
app.use(Flash.setFlash);
app.use(passport.setAuthenticationUser);

app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up on port ",port);
})