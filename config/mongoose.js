const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
mongoose.set('strictQuery',false);

mongoose.connect(process.env.MONGO_URL||'mongodb://localhost/ippopay-assignment');

const db=mongoose.connection;

db.on('error',()=>{console.log("error connect db")});

db.once('open',()=>{console.log("DB connect successfully")});

module.exports=db;