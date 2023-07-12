require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const {
  celebrate,
  errors,
} = require('celebrate');
const cors = require('cors');

const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const processErrors = require('./middlewares/processErrors');
const {
  signInSchema,
  signUpSchema,
} = require('./middlewares/validationSchema');
const NotFoundError = require('./components/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb://0.0.0.0:27017/mongodb';

mongoose.connect(uri);

app.use(cors({
  credentials: true,
  origin: 'https://mesto.place.nomoredomains.work',
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({ body: signInSchema }), login);

app.post('/signup', celebrate({ body: signUpSchema }), createUser);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());
app.use(processErrors);

app.listen(PORT);
