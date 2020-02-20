const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, status, res) => {
  const token = signToken(user._id);

  const expires = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
  );

  const cookieOptions = {
    expires,
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  user.password = undefined;

  res
    .status(status)
    .cookie('jwt', token, cookieOptions)
    .json({
      status: 'success',
      user,
      token
    });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('Not authorized to do that.', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);

  console.log(token);
  // If user has changed password since last JWT sign
  if (user.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError(
        'You recently changed your password, login with the new password',
        401
      )
    );
  }

  req.user = user;

  next();
});

exports.logout = (req, res, next) => {
  res
    .cookie('jwt', '', {
      expires: new Date(new Date() + 0 * 1000),
      httpOnly: true
    })
    .status(200)
    .json({
      status: 'success',
      message: 'Logged out'
    });
};

exports.isLoggedin = async (req, res, next) => {
  if (req.cookies.jwt) {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

    const currentUser = await User.findById(decoded.id).select(
      '+passwordChangedAt'
    );

    if (!currentUser) {
      return next();
    }

    if (currentUser.passwordChangedAfter(currentUser.passwordChangedAt)) {
      return next();
    }

    res.locals.user = currentUser;
    return next();
  }
  // User not logged in
  next();
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const user = await User.create({ name, email, password, confirmPassword });

  createSendToken(user, 201, res);
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

  createSendToken(user, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('No user found with that E-mail', 404));
  }

  const resetToken = user.generateResetToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/reset-password/${resetToken}`;

  const subject = 'E-mail Reset Token';

  const message = `Hello there, somebody (hopefully you) requested for a password change. Make a patch request to ${resetUrl} to change your password `;

  console.log(resetToken);

  try {
    // await sendEmail({ to: email, subject, message });
  } catch (err) {
    this.passwordResetToken = undefined;
    this.passwordTokenExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('E-mail could not be sent', 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'An E-mail containing the reset token has been sent to your E-mail'
  });
});

exports.resetPassord = catchAsync(async (req, res, next) => {
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken,
    passwordTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Invalid or Expired reset token', 404));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordTokenExpiry = undefined;

  await user.save();

  createSendToken(user, 200, res);
});

// Update Password for logged in user
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user).select('+password');

  if (!(await req.user.comparePassword(password, user.password))) {
    return next(new AppError('Incorrect password', 401));
  }

  user.password = newPassword;
  user.confirmPassword = confirmPassword;

  await user.save();

  createSendToken(user, 200, res);
});
