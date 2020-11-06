const articles = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validateId, validateArticle } = require('../middlewares/validation');

articles.get('/articles', getArticles);
articles.post('/articles', validateArticle, createArticle);
articles.delete('/articles/:articleId', validateId, deleteArticle);

module.exports = articles;
