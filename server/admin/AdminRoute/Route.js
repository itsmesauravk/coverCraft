const express = require('express');
const router = express.Router();

const {
    show,
    AddNewProduct,
    uploadSingle,
    getProducts,
    deleteProduct,
    singleProduct,
    updateProduct,
    updateSingle

     } = require('../AdminController/Controller');

router.route('/show').get(show);
router.route('/add-product').post(uploadSingle,AddNewProduct);
router.route('/get-products').get(getProducts);
router.route('/delete-product/:id').delete(deleteProduct);
router.route('/update-product/:id').get(singleProduct).patch(updateSingle,updateProduct);

module.exports = router;
