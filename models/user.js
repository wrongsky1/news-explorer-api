const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-error');
const { messages } = require('../utils/messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Длина поля Имени должна быть от 2 до 30 символов'],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(name) {
        return !validator.isEmpty(name, { ignore_whitespace: true });
      },
      message: messages.schemas.isEmpty,
    },
  },
  email: {
    type: String,
    required: [true, 'Необходимо указать email'],
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: messages.schemas.emailIsNotValid,
    },
  },
  password: {
    type: String,
    required: [true, messages.user.passwordTooShort],
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages.auth.wrongEmailOrPassword);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.auth.wrongEmailOrPassword);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
