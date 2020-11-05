require('dotenv').config();

module.exports = {
  PORT: 3000,
  DB_ADDRESS: (process.env.NODE_ENV !== 'production') ? 'mongodb://localhost:27017/newsexplorerdb' : process.env.DB_ADDRESS,
  JWT_SECRET: (process.env.NODE_ENV !== 'production') ? 'JWT_SECRET' : process.env.JWT_SECRET,
};
