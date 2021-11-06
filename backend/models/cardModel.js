const validator = require("validator");

const mongoose = require("mongoose");

// Схема card преобразуем схему в модель и перадаем её в контроллер
// там обрабатываем введенные данные
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: (value) => {
        return validator.isURL(value);
      },
      message: "Не корректный URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Преобразуем схему в модель и экспортируем ===============================
module.exports = mongoose.model("card", cardSchema);
