const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const postRoutes = require('./routes/post');

const app = express();

app.use(express.json());

// Helmet
app.use(helmet());

// Log dev requests
app.use(morgan('dev'));

// Mount app routes
app.use('/api/v1/post', postRoutes);

module.exports = app;
