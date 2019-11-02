const express = require('express');

const morgan = require('morgan');

const postRoutes = require('./routes/post');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1/post', postRoutes);

module.exports = app;
