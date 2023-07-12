const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const NotFoundError = require('../components/NotFoundError');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user != null) {
        res.status(200).send({ data: user });
        return;
      }
      next(new NotFoundError('Пользователь не найден.'));
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create(
        {
          email: req.body.email,
          password: hash,
          name: req.body.name,
          about: req.body.about,
          avatar: req.body.avatar,
        },
      )
        .then((user) => res.status(201).send({
          _id: user._id,
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        }))
        .catch(next);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  const currentUser = req.user._id;

  User.findByIdAndUpdate(
    currentUser,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  const currentUser = req.user._id;

  User.findByIdAndUpdate(
    currentUser,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports = {
  login,
  getUsers,
  getMe,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
