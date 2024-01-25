const express = require('express');
const router = express.Router();

const {
    show,
    AddNewProduct,
    uploadSingle,
    getProducts

     } = require('../AdminController/Controller');

router.route('/show').get(show);
router.route('/add-product').post(uploadSingle,AddNewProduct);
router.route('/get-products').get(getProducts);

module.exports = router;
