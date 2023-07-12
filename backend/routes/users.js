const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  userIdSchema,
  userAvatarSchema,
  userInfoSchema,
} = require('../middlewares/validationSchema');
const {
  getUsers,
  getMe,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:userId', celebrate({ params: userIdSchema }), getUserById);

router.patch('/users/me', celebrate({ body: userInfoSchema }), updateProfile);

router.patch('/users/me/avatar', celebrate({ body: userAvatarSchema }), updateAvatar);

module.exports = router;
