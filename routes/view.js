const express = require('express');

const authController = require('./../controllers/auth');

const viewsController = require('./../controllers/views');

const router = express.Router();

router.use(authController.isLoggedin);

router.get('/login', viewsController.getLogin);

router.route('/post/:slug').get(viewsController.getPost);

router.route('/').get(viewsController.getHome);

module.exports = router;
