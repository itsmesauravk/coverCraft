const express = require('express');
const router = express.Router();

//for image
const upload = require('../../middleware/multer');

const uploadSingle = upload.single("coverPhoto") ;
const updateSingle = upload.single("updateCoverPhoto") ;


const {
    show,
    AddNewProduct,
    getProducts,
    deleteProduct,
    singleProduct,
    updateProduct,

     } = require('../AdminController/Controller');

router.route('/show').get(show);
router.route('/add-product').post(uploadSingle,AddNewProduct);
router.route('/get-products').get(getProducts);
router.route('/delete-product/:id').delete(deleteProduct);
router.route('/update-product/:id').get(singleProduct).patch(updateSingle,updateProduct);

module.exports = router;
