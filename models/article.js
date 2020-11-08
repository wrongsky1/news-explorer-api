const mongoose = require('mongoose');
const validator = require('validator');
const { messages } = require('../utils/messages');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: [true, 'Ссылка на статью обязательна'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: messages.schemas.wrongUrl,
    },
  },
  image: {
    type: String,
    required: [true, 'Ссылка на изображение обязательна'],
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: messages.schemas.wrongUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
