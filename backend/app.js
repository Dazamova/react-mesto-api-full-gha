const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, BASE_PATH = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(BASE_PATH, {})
  .then(() => {
    console.log('Connected');
  }).catch((err) => {
    console.log(`Error during connection ${err}`);
  });

app.use(bodyParser.json()); // для работы с телом запроса
app.use(cookieParser());

app.use(requestLogger); // логгер запросов

app.use('/', router); // обработчик роутов

app.use(errorLogger); // логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => { // централизованный обработчик ошибок
  const { statusCode = 500, message } = err; // если у ошибки нет статуса, выставляем 500

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
  console.log(BASE_PATH);
});
