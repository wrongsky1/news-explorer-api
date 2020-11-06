const user = require('express').Router();
const { getUserInfo } = require('../controllers/users');

user.get('/users/me', getUserInfo);

module.exports = user;
