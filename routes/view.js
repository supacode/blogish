const express = require('express');

const authController = require('./../controllers/auth');

const viewsController = require('./../controllers/views');

const router = express.Router();

router.use(authController.isLoggedin);

router.route('/login').get(viewsController.getLogin);

router.route('/').get(viewsController.getHome);

router.route('/post/:slug').get(viewsController.getPost);

module.exports = router;
