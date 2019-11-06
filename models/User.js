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
  },
  passwordTokenExpiry: Date,
  passwordResetToken: String,
  passwordChangedAt: Date
});

userSchema.methods.comparePassword = async function(
  enteredPassword,
  userPassword
) {
  return bcrypt.compare(enteredPassword, userPassword);
};

userSchema.pre('save', function(next) {
  if (this.isNew || !this.isModified('password')) next();

  this.passwordChangedAt = Date.now();

  next();
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

userSchema.methods.passwordChangedAfter = function(JWTtimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangeTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); //Convert passwordChangedAt date => timestamp

    return JWTtimestamp < passwordChangeTimestamp;
  }

  return false;
};

userSchema.methods.generateResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  const hashedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetToken = hashedResetToken;
  this.passwordTokenExpiry = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
