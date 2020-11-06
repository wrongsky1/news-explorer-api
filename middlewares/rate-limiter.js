const rateLimit = require('express-rate-limit');
const { messages } = require('../utils/messages');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: messages.limiter.manyRequests,
});

module.exports = limiter;
