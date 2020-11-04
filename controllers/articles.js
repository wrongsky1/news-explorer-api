const article = require('../models/article');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { messages } = require('../utils/messages');

module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res
      .status(200)
      .send({ status: '200', data: articles });
  } catch (err) {
    next(err);
  }
};