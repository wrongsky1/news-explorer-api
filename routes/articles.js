const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validateId, validateArticle } = require('../middlewares/validation');

router.get('/articles', getArticles);
router.post('/articles', validateArticle, createArticle);
router.delete('/articles/:articleId', validateId, deleteArticle);

module.exports = router;
