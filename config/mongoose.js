const mongoose=require('mongoose');

mongoose.set('strictQuery',false);

mongoose.connect('mongodb://localhost/ippopay-assignment');

const db=mongoose.connection;

db.on('error',()=>{console.log("error connect db")});

db.once('open',()=>{console.log("DB connect successfully")});

module.exports=db;