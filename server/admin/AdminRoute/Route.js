const express = require('express');
const router = express.Router();

const {
    show,
    AddNewProduct,
    uploadSingle

     } = require('../AdminController/Controller');

router.route('/show').get(show);
router.route('/add-product').post(uploadSingle,AddNewProduct);

module.exports = router;
