// Импортируем модель user из ../models/user
const Card = require("../models/cardModel");
const NotFoundError404 = require("../errors/not-found-err-404");
const ForbiddenErr403 = require("../errors/forbidden-err-403");

// Обрабатываем запрос на получение данных всех Cards ======================
module.exports.getCards = (req, res, next) => {
  return Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

// +Обрабатываем запрос на удаление Card ===================================
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError404("Карточка с указанным _id не найдена!!!.");
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(
          new ForbiddenErr403({
            message: "Нельзя удалять чужие карточки",
          })
        );
      } else {
        Card.deleteOne(card).then(() => {
          return res.send({ data: card });
        });
      }
    })
    .catch(next);
};

// Обрабатываем запрос на создание Card=====================================
module.exports.createCard = (req, res, next) => {
  return Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      return res.status(200).send(card);
    })
    .catch(next);
};

// Обрабатываем запрос на добавление Лайк Card==============================
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  })
    .then((data) => {
      if (!data) {
        throw new NotFoundError404({
          message: "Передан несуществующий _id карточки.",
        });
      }
      return res.status(200).send(data);
    })
    .catch(next);
};

// Обрабатываем запрос на удаление Лайк Card================================
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError404({
          message: "Передан несуществующий _id карточки.",
        });
      }
      return res.status(200).send(data);
    })
    .catch(next);
};
