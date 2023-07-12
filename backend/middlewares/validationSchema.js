const { Joi } = require('celebrate');

const userEmailPasswordSchema = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
};

const userNameAboutSchema = {
  name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
  about: Joi.string().min(2).max(30).default('Исследователь'),
};

const avatarSchema = {
  avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/i),
};

const signInSchema = Joi.object().keys(userEmailPasswordSchema);

const signUpSchema = Joi.object().keys({
  ...userEmailPasswordSchema,
  ...userNameAboutSchema,
  ...avatarSchema,
});

const cardInfoSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().pattern(/(^https?:\/\/)?(www\.)?[a-z0-9~_\-.]+\.[a-z]{2,9}([!-~]*)?$/i),
});

const cardIdSchema = Joi.object().keys({
  cardId: Joi.string().required().length(24).hex(),
});

const userIdSchema = Joi.object().keys({
  userId: Joi.string().required().length(24).hex(),
});

const userAvatarSchema = Joi.object().keys({
  avatar: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/i),
});

const userInfoSchema = Joi.object().keys({
  name: Joi.string().min(2).max(30).required(),
  about: Joi.string().min(2).max(30).required(),
});

module.exports = {
  signInSchema,
  signUpSchema,
  userIdSchema,
  userAvatarSchema,
  userInfoSchema,
  cardIdSchema,
  cardInfoSchema,
};
