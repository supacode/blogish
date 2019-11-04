const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const errorHandler = require('./controllers/error');

dotenv.config({
  path: './config.env'
});

const app = express();

app.use(express.json());

// Helmet
app.use(helmet());

// Log dev requests
app.use(morgan('dev'));

// Mount app routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/comment', commentRoutes);

// Fallback
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `${req.originalUrl} was not found on this server`
  });
});

//Global Error Handler
app.use(errorHandler);

module.exports = app;
