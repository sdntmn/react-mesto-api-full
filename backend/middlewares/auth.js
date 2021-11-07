// импортируем модуль jsonwebtoken
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UnauthorizedErr401 = require("../errors/unauthorized-err-401");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedErr401({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    next(new UnauthorizedErr401({ message: "Необходима авторизация" }));
  }
  req.user = payload;

  return next(); // пробрасываем запрос дальше
};
