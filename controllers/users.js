const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { messages } = require('../utils/messages');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError(messages.user.idIsNotFound);
    })
    .then((user) => res.send({ data: { name: user.name, email: user.email } }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError(messages.user.emailAlreadyRegistered);
      } else next(err);
    })
    .then((user) => res.status(201).send({
      data: {
        email: user.email, name: user.name,
      },
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send(messages.auth.authIsSuccess);
    })
    .catch(next);
};

module.exports.logout = async (req, res, next) => {
  try {
    await res.clearCookie('jwt', {
      httpOnly: true,
    });

    await res
      .status(200)
      .send({ status: '200', message: messages.auth.logout });
  } catch (err) {
    next(err);
  }
};
