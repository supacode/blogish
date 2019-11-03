const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');
exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const user = await User.create({ name, email, password, confirmPassword });

  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
});
