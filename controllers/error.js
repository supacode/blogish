const AppError = require('./../utils/appError');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  console.log(error);

  // Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new AppError(message, 400);
  }

  // Invalid ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Duplicate Error
  if (err.code === 11000) {
    const message = 'Duplicate values supplied';
    error = new AppError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    status: error.status,
    message: error.message || 'Something went terribly wrong'
  });
};

module.exports = errorHandler;
