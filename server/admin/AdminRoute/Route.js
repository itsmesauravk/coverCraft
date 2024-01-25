const express = require('express');
const router = express.Router();

const { show } = require('../AdminController/Controller');

router.route('/show').get(show);

module.exports = router;
