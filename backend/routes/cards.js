const router = require('express').Router();
const { celebrate } = require('celebrate');
const { cardInfoSchema, cardIdSchema } = require('../middlewares/validationSchema');
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({ body: cardInfoSchema }), createCard);

router.delete('/cards/:cardId', celebrate({ params: cardIdSchema }), deleteCard);

router.put('/cards/:cardId/likes', celebrate({ params: cardIdSchema }), putLike);

router.delete('/cards/:cardId/likes', celebrate({ params: cardIdSchema }), deleteLike);

module.exports = router;
