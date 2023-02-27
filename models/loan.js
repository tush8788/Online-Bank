const mongoose=require('mongoose');

const loanSchma=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    LoanAmount:{
        type:Number,
        required:true
    },
    RateOfIntrest:{
        type:Number,
        default:8
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    isApprove:{
        type:Boolean,
        default:false
    },
    isReject:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const Loan=mongoose.model("Loan",loanSchma);

module.exports=Loan;