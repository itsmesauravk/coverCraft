
const express = require('express');
const router = express.Router();

const upload = require('../../middleware/multer');

//for user image
const userPhoto = upload.single("userPhoto");

const {
    register,
    login,
    profile,
    logout
} = require('../controller/controller');

router.route('/register').post(userPhoto,register);
router.route('/login').post(login);
router.route('/profile').get(profile);
router.route('/logout').post(logout);

module.exports = router;