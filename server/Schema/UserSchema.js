const mongoose = require('mongoose');

const newUserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,   
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    number:{
        type:Number,
        required:true,
        minlength:10
    },
    photo:{
        type:String,
        default:''
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{timestamps:true}
)

const User = mongoose.model('User',newUserSchema);
module.exports = User;