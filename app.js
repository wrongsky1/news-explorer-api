const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const limiter = require('./middlewares/rate-limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errors-handler');
const { PORT, DB_ADDRESS } = require('./utils/config');

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://localhost:3000', 'https://wrongsky1.github.io/news-explorer-frontend/'],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
