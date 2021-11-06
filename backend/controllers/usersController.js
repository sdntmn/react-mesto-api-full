// Для хеширования пароля
const bcrypt = require("bcryptjs");
// импортируем модуль jsonwebtoken
const jwt = require("jsonwebtoken");
// Импортируем модель user из ../models/user
const User = require("../models/userModel");

const NotFoundError404 = require("../errors/not-found-err-404");
const ConflictError409 = require("../errors/conflict-err-409");
const UnauthorizedErr401 = require("../errors/unauthorized-err-401");

// Обрабатываем запрос на получение данных всех Users ======================
module.exports.getUsers = (req, res, next) => {
  return User.find({})
    .then((user) => {
      return res.status(200).send(user);
    })

    .catch(next);
};

// Обрабатываем запрос на получение данных конкретного User по id===========
module.exports.getUser = (req, res, next) => {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError404({
          message: " Пользователь по указанному _id не найден",
        });
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

// Обрабатываем запрос на создание User=====================================
module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      return User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      });
    })
    .then(() => {
      return res.status(200).send({
        user: {
          name: req.body.name,
          about: req.body.about,
          avatar: req.body.avatar,
          email: req.body.email,
        },
      });
    })
    .catch((err) => {
      if (err.name === "MongoServerError" && err.code === 11000) {
        next(new ConflictError409({ message: "Уже существует в базе email" }));
      } else {
        next(err);
      }
    });
};

// Обрабатываем запрос на обновление данных User ===========================
module.exports.updateUser = (req, res, next) => {
  return User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true }
  )
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
};

// Обрабатываем запрос на обновление Avatar User ===========================
module.exports.updateUserAvatar = (req, res, next) => {
  return User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true }
  )
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: "Авторизация прошла успешно" });
    })
    .catch(() => {
      throw new UnauthorizedErr401({
        message: "Неправильные почта или пароль",
      });
    })
    .catch(next);
};

// Обрабатываем запрос на получение данных авторизированного Usera =========
module.exports.getAuthUser = (req, res, next) => {
  const id = req.user._id;
  return User.findById({ _id: id })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
};
