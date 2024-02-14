
const mongoose = require('mongoose');

const addProductSchema = new mongoose.Schema({

    coverName:{
        type:String,
        
    },
    coverPrice:{
        type:Number,
       
    },
    coverPhoto:{
        type:String,
        
    },
    coverCategory:{
        type:String,
        
    },
    coverType:{
        type:String,
        
    },
    coverDescription:{
        type:String,
        
    }

},{timestamps:true}
)

const AddProduct = mongoose.model('AddProduct',addProductSchema);

module.exports = AddProduct;