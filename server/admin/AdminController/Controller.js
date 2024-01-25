
//add product schema
const AddProduct = require('../AddSchema');

//for image
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, './uploads');
    },
    filename: function (req,file,cb){
        const uniqueFileName = Date.now() + "_" + file.originalname;
        cb(null, file.fieldname + "_" + uniqueFileName);
    }
})
const upload = multer({storage})


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
//for uploading the photo
const uploadSingle = upload.single("coverPhoto") ;

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



module.exports = {
    show,
    AddNewProduct,
    uploadSingle,
    getProducts,
    deleteProduct
    
}