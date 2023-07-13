const Card = require('../models/card');
const ForbiddenError = require('../components/ForbiddenError');
const NotFoundError = require('../components/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .then((cardData) => {
      if (cardData === null) {
        next(new NotFoundError('Карточка не найдена.'));
      } else if (cardData.owner.toString() !== req.user._id) {
        return next(new ForbiddenError());
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .then((card) => res.status(200).send({ data: card }));
    })
    .catch(next);
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card != null) {
        res.status(200).send({ data: card });
        return;
      }
      next(new NotFoundError('Карточка не найдена.'));
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card != null) {
        res.status(200).send({ data: card });
        return;
      }
      next(new NotFoundError('Карточка не найдена.'));
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
