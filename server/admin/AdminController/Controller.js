
//add product schema
const AddProduct = require('../AddSchema');

//for image
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, '.../uploads');
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
const uploadSingle = upload.single("coverPhoto") ;




module.exports = {
    show,
    AddNewProduct,
    uploadSingle
}