const express=require('express');
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
// passport for authentication
const passport=require('passport');
const localStretegy=require('./config/passport-local-stretegy');
// session cookie
const expressSession=require('express-session');
const mongoStrore=require('connect-mongo');
// notifiaction
const connectFlash=require('connect-flash');
const Flash=require('./config/Notification');
// env
const dotenv=require('dotenv').config();

const port=process.env.PORT||8000

const app=express();
// set ejs
app.set('view engine','ejs');
app.set('views','./views');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.urlencoded({extended:false}));
app.use(expressLayout);
//set session cookie
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
// passport
app.use(passport.initialize());
app.use(passport.session());
//notifiaction 
app.use(connectFlash());
app.use(Flash.setFlash);
app.use(passport.setAuthenticationUser);

app.use('/',require('./routes/index'));
//listen
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up on port ",port);
})