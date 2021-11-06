import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const [cardTitle, setCardTitle] = useState("");
  const [cardLink, setCardLink] = useState("");

  useEffect(() => {
    setCardTitle("");
    setCardLink("");
  }, [isOpen]);

  // Обработчик изменения инпута обновляет стейт
  function handleChangeInputTitle(evt) {
    setCardTitle(evt.target.value);
  }

  // Обработчик изменения инпута обновляет стейт
  function handleChangeInputLink(evt) {
    setCardLink(evt.target.value);
  }

  function handleSubmitCard(evt) {
    evt.preventDefault();
    onUpdateCard({
      name: cardTitle,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="mesto"
      title="Новое место"
      btnName="Создать"
      onSubmit={handleSubmitCard}
    >
      <input
        className="popup__input popup__input_value_mesto"
        id="name-input"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        type="text"
        name="place"
        value={cardTitle ? cardTitle : ""}
        onChange={handleChangeInputTitle}
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        className="popup__input popup__input_value_link"
        id="link-input"
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        value={cardLink ? cardLink : ""}
        onChange={handleChangeInputLink}
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}
