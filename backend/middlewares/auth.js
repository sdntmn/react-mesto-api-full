// импортируем модуль jsonwebtoken
const jwt = require("jsonwebtoken");

const UnauthorizedErr401 = require("../errors/unauthorized-err-401");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return next(new UnauthorizedErr401({ message: "Необходима авторизация" }));
  }

  req.user = payload;
  return next(); // пробрасываем запрос дальше
};
