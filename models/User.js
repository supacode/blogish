const crypto = require('crypto');

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'User must have an E-mail'],
    validate: [validator.isEmail, 'Provide a valid E-mail'],
    unique: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'mod', 'user'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm your password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords do not match'
    }
  }
});

userSchema.methods.comparePassword = async function(
  enteredPassword,
  userPassword
) {
  return bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.generateResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  const resetTokenHashed = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetToken = resetTokenHashed;

  const resetTokenExpiry =
    Date.now() + +process.env.PASSWORD_TOKEN_EXPIRY * 60 * 1000;

  this.resetTokenExpiry = resetTokenExpiry;

  return resetToken;
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

module.exports = mongoose.model('User', userSchema);
