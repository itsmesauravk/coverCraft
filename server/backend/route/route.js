
const express = require('express');
const router = express.Router();

const upload = require('../../middleware/multer');

//for user image
const userPhoto = upload.single("userPhoto");

const {
    register,
    login,
    profile,
    logout,
    getUsers,
    getProducts,
    getSingleProduct,
    getProductsByType,
    deleteUserCustomer,
    userRank,
    addToCart,
    removeFromCart
} = require('../controller/controller');

router.route('/register').post(userPhoto,register);
router.route('/login').post(login);
router.route('/profile').get(profile);
router.route('/logout').post(logout);
router.route('/get-users').get(getUsers);
router.route('/get-products').get(getProducts);
router.route('/get-single-product/:id').get(getSingleProduct);
router.route('/get-products-by-type/:type').get(getProductsByType);
router.route('/delete-user/:id').post(deleteUserCustomer)
router.route('/user-rank/:id').post(userRank)
router.route('/add-to-cart').post(addToCart)
router.route('/remove-from-cart').post(removeFromCart)

module.exports = router;