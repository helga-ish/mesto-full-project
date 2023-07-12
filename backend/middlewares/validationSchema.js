const { Joi } = require('celebrate');

const signInSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

const signUpSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
  about: Joi.string().min(2).max(30).default('Исследователь'),
  avatar: Joi.string().pattern(/(^https?:\/\/)?(www\.)?[a-z0-9~_\-.]+\.[a-z]{2,9}([!-~]*)?$/i).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
});

// const validateForCreateCard = () => {
//   celebrate({
//     body: Joi.object().keys({
//       name: Joi.string().required().min(2).max(30),
//     }),
//   });
// };

// const validateForCardId = () => {
//   celebrate({
//     params: Joi.object().keys({
//       cardId: Joi.string().required().length(24).hex(),
//     }),
//   });
// };

// const validateForUserId = () => {
//   celebrate({
//     params: Joi.object().keys({
//       userId: Joi.string().required().length(24).hex(),
//     }),
//   });
// };

// const validateForAvatar = () => {
//   celebrate({
//     body: Joi.object().keys({
//     }),
//   });
// };

// const validateForUserData = () => {
//   celebrate({
//     body: Joi.object().keys({
//       name: Joi.string().required().min(2).max(30),
//       about: Joi.string().required().min(2).max(30),
//     }),
//   });
// };

module.exports = {
  signInSchema,
  signUpSchema,
};
