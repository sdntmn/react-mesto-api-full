const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { errors, celebrate, Joi } = require("celebrate");
require("dotenv").config();
const validator = require("validator");
const routerUser = require("./routes/usersRoutes");
const routerCard = require("./routes/cardsRoutes");
const { createUser, login } = require("./controllers/usersController");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const NotFoundError = require("./errors/not-found-err-404");

const { PORT = 3001 } = process.env;

const app = express();

const options = {
  origin: [
    "http://place-tmn.students.nomoredomains.work",
    "https://place-tmn.students.nomoredomains.work",
    "http://localhost:3001",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "origin", "Authorization"],
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger); // подключаем логгер запросов

// !!! Тестовый путь
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

// роуты без авторизации
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new Error("Неправильный формат ссылки");
        } else {
          return value;
        }
      }),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

// роуты с авторизацией
app.use("/users", auth, routerUser);
app.use("/cards", auth, routerCard);
app.use("*", () => {
  throw new NotFoundError("Маршрут не найден");
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

// запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер работает и готов к получению данных на ${PORT} port...`);
});
