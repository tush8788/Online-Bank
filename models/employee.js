const mongoose=require('mongoose');

const employeeSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isEmployee:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
});

const Employee = mongoose.model('Employee',employeeSchema);

module.exports=Employee;