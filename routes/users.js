const router = require('express').Router();
const { getUserInfo } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/users/me', getUserInfo);

module.exports = router;