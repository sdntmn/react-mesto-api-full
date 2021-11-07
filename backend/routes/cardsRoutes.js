const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/сardsСontroller");

router.get("/", getCards);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .custom((value) => {
          if (!validator.isURL(value, { require_protocol: true })) {
            throw new Error("Неправильный формат ссылки");
          } else {
            return value;
          }
        }),
    }),
  }),
  createCard
);

// Удаление карточки =======================================================
router.delete(
  "/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  deleteCard
);

// Поставить лайк карточке =================================================
router.put(
  "/likes/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  likeCard
);

// Снять лайк карточки =====================================================
router.delete(
  "/likes/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  dislikeCard
);

module.exports = router;
