const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getMe,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/i),
  }),
}), updateAvatar);

module.exports = router;
