const express = require('express');
const router = express.Router();

const {
    show,
    AddNewProduct,
    uploadSingle,
    getProducts,
    deleteProduct

     } = require('../AdminController/Controller');

router.route('/show').get(show);
router.route('/add-product').post(uploadSingle,AddNewProduct);
router.route('/get-products').get(getProducts);
router.route('/delete-product/:id').delete(deleteProduct);

module.exports = router;
