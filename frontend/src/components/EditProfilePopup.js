import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Стейт, в котором содержится значение инпута
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  /* Нужно еще следить за isOpen (за состоянием открытия), чтобы вставлять в инпуты данные пользователя, иначе, если мы удалим информацию из инпутов и просто закроем попап, то при следующем открытии инпуты будут пустые (без данных пользователя)
   */

  // Обработчик изменения инпута обновляет стейт
  function handleChangeInputName(evt) {
    setName(evt.target.value);
  }

  // Обработчик изменения инпута обновляет стейт
  function handleChangeInputDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="profile"
      title="Редактировать профиль"
      btnName="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_value_name"
        id="name-user"
        minLength="2"
        maxLength="40"
        placeholder="Введите ФИО"
        type="text"
        name="name"
        value={name ? name : ""}
        onChange={handleChangeInputName}
        required
      />
      <span className="popup__input-error name-user-error"></span>
      <input
        className="popup__input popup__input_value_job"
        id="about-input"
        minLength="2"
        maxLength="200"
        placeholder="Введите специализацию"
        type="text"
        name="about"
        value={description ? description : ""}
        onChange={handleChangeInputDescription}
        required
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  );
}
