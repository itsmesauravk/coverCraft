
const mongoose = require('mongoose');

const addProductSchema = new mongoose.Schema({

    coverName:{
        type:String,
        required:true
    },
    coverPrice:{
        type:Number,
        required:true
    },
    coverPhoto:{
        type:String,
        required:true
    },
    coverCategory:{
        type:String,
        required:true
    },
    coverType:{
        type:String,
        required:true
    },
    coverDescription:{
        type:String,
        required:true
    }

},{timestamps:true}
)

const AddProduct = mongoose.model('AddProduct',addProductSchema);

module.exports = AddProduct;