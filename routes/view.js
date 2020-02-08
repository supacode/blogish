const express = require('express');

const viewsController = require('./../controllers/views');

const router = express.Router();

router.route('/').get(viewsController.getHome);

module.exports = router;
