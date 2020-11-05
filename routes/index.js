const router = require('express').Router();
const user = require('./users');
const articles = require('./articles');
const auth = require('../middlewares/auth');
const { validateUser, validateLogin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-error');
const { messages } = require('../utils/messages');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth, user);
router.use(auth, articles);

router.use((req, res, next) => {
  next(new NotFoundError(messages.validation.notFound));
});

module.exports = router;
