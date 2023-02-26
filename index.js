const express=require('express');
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
const port=process.env.PORT||8000

const app=express();

app.set('view engine','ejs');
app.set('views','./views');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.urlencoded({extended:false}));
app.use(expressLayout);

app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up on port ",port);
})