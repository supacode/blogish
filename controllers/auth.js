const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.protect = (req, res, next) => {
  next();
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const user = await User.create({ name, email, password, confirmPassword });

  const token = signToken(user._id);

  console.log(token);

  res.status(201).json({
    status: 'success',
    data: {
      user,
      token
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password, user.password))) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid E-mail or Password combination'
    });
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    user
  });
});
