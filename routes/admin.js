const express = require('express');

const adminController = require('./../controllers/admin');

const router = express.Router();

router.route('/add-post').get(adminController.getAddPost);

module.exports = router;
