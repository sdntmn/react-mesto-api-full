const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const router = require("express").Router();

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getAuthUser,
} = require("../controllers/usersController");

// возвращает информацию о всех пользователях
router.get("/", getUsers);

router.get("/me", getAuthUser);

// обновление данных пользователя
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2),
    }),
  }),
  updateUser
);
// обновление аватар
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
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
  updateUserAvatar
);

// возвращает информацию о пользователе по id
router.get(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  getUser
);

module.exports = router;
