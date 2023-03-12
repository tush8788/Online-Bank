const mongoose=require('mongoose');

const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    adharNo:{
        type:String,
        unique:true
    },
    panNo:{
        type:String,
        unique:true
    },
    address:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    isSaving:{
        type:Boolean
    },
    balance:{
        type:Number,
        default: 0
    },
    loanAmount:{
        type:Number,
        default:0
    },
    creditScore:{
        type:Number
    }
},{timestamps:true});

const Customer=mongoose.model("Customer",customerSchema);

module.exports=Customer;