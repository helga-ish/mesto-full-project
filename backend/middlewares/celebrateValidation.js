const {
  celebrate,
  Joi,
} = require('celebrate');

const validateForSignIn = () => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  });
};

const validateForSignUp = () => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string().pattern(/(^https?:\/\/)?(www\.)?[a-z0-9~_\-.]+\.[a-z]{2,9}([!-~]*)?$/i).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    }),
  });
};

const validateForCreateCard = () => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(/(^https?:\/\/)?(www\.)?[a-z0-9~_\-.]+\.[a-z]{2,9}([!-~]*)?$/i),
    }),
  });
};

const validateForCardId = () => {
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  });
};

const validateForUserId = () => {
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  });
};

const validateForAvatar = () => {
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/i),
    }),
  });
};

const validateForUserData = () => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  });
};

const userEmailValidation = { email: Joi.string().required().email() };
const userPasswordValidation = { password: Joi.string().required().min(8) };
const userNameValidation = { name: Joi.string().min(2).max(30).default('Жак-Ив Кусто') };
const userAboutValidation = { about: Joi.string().min(2).max(30).default('Исследователь') };
const userAvatarValidation = { avatar: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/i) };
const userIdValidation = { userId: Joi.string().required().length(24).hex() };
const cardIdValidation = { cardId: Joi.string().required().length(24).hex() };
const cardInfoValidation = { name: Joi.string().required().min(2).max(30), link: Joi.string().required().pattern(/(^https?:\/\/)?(www\.)?[a-z0-9~_\-.]+\.[a-z]{2,9}([!-~]*)?$/i) };

module.exports = {
  validateForSignIn,
  validateForSignUp,
  validateForAvatar,
  validateForCardId,
  validateForCreateCard,
  validateForUserData,
  validateForUserId,
  userAboutValidation,
  userAvatarValidation,
  userEmailValidation,
  userIdValidation,
  userNameValidation,
  userPasswordValidation,
  cardIdValidation,
  cardInfoValidation,
};
