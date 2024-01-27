
//add product schema
const AddProduct = require('../../Schema/AddSchema');

// //for image
// const multer = require('multer');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb){
//         return cb(null, './uploads');
//     },
//     filename: function (req,file,cb){
//         const uniqueFileName = Date.now() + "_" + file.originalname;
//         cb(null, file.fieldname + "_" + uniqueFileName);
//     }
// })
// const upload = multer({storage})


const show =  (req,res) => {
    res.send('This is working sucessfully');
}

const AddNewProduct =async(req,res) =>{
    try {
        const {coverName,coverPrice,coverCategory,coverType,coverDescription} = req.body;

        const coverPhoto = req.file.path;

        const newProduct = await AddProduct.create({
            coverName:coverName,
            coverPrice:coverPrice,
            coverPhoto:coverPhoto,
            coverCategory:coverCategory,
            coverType:coverType,
            coverDescription:coverDescription
        })
        if(newProduct){
            res.status(200).json({
                message:"New Product Added",
                data:newProduct
            })
        }
        
    } catch (error) {
        console.log("Error adding new Product : ",error)
    }
}



// for getting all product
const getProducts = async(req,res) =>{

    try {
        const allProducts = await AddProduct.find();
        if(allProducts){
            res.status(200).json({
                message:"All Products",
                data:allProducts
            })
        }else{
            res.status(400).json({
                message:"No Products found."
            })
        }
    } catch (error) {
        console.log("Error getting all products : ",error)
    }
}

//for delecting the product
const deleteProduct = async(req,res) =>{
    try {
        const {id} = req.params;
        const deleteProduct = await AddProduct.findByIdAndDelete(id);
        if(deleteProduct){
            res.status(200).json({
                message:"Product deleted successfully",
                data:deleteProduct
            })
        }else{
            res.status(400).json({
                message:"No Product found."
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message:"Error deleting the product : ",error
        })
    }

}

//for single product details
const singleProduct = async(req,res) =>{
    try {
        const {id} = req.params;
        const singleProduct = await AddProduct.findById(id);
        if(singleProduct){
            res.status(200).json({
                message:"Product details",
                data:singleProduct
            })
        }else{
            res.status(400).json({
                message:"No Product found."
            })
        }
        
    } catch (error) {
        res.status(400).json({ 
            message:"Error getting the product : ",error
        })
    }

}

//for updating the product
const updateProduct = async(req,res) =>{
    try {
        const {id} = req.params;
        const {coverName,coverPrice,coverCategory,coverType,coverDescription} = req.body;

        const coverPhoto = req.file.path;

        const updateProduct = await AddProduct.findByIdAndUpdate(
            id,
            {
                coverName: coverName,
                coverPrice: coverPrice,
                coverPhoto: coverPhoto,
                coverCategory: coverCategory,
                coverType: coverType,
                coverDescription: coverDescription
            },
            { new: true } 
        );
        if(updateProduct){
            res.status(200).json({
                message:"Product updated successfully",
                data:updateProduct
            })
        }else{      res.status(400).json({
                message:"No Product found."
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message:"Error updating the product : ",error
        })
    }

}
    


module.exports = {
    show,
    AddNewProduct,
    getProducts,
    deleteProduct,
    singleProduct,
    updateProduct,  
}