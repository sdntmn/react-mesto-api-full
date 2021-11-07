import React from "react";

function PopupWithForm({
  title,
  children,
  btnName,
  isOpen,
  name,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`popup ${isOpen && "popup_is-opened"}`}
      id={`popup_${name}`}
    >
      <div className="popup__container">
        <form
          className={`popup__form popup__form_type_${name}`}
          id={`form_${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
        >
          <button
            className="popup__close"
            type="button"
            aria-label="Кнопка закрытия формы"
            onClick={onClose}
          ></button>
          <fieldset className="popup__data">
            <legend className="popup__title">{title}</legend>
            {children}
          </fieldset>
          <button type="submit" className="popup__button" aria-label="Да">
            {btnName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
