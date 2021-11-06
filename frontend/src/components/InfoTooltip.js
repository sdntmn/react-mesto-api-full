import React from "react";
import statusOk from "../images/Union.svg";
import statusErr from "../images/UnionRed.svg";

function InfoTooltip({ isOpen, name, onClose, message, image }) {
  return (
    <div
      className={`popup ${isOpen && "popup_is-opened"}`}
      id={`popup_${name}`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Кнопка закрытия формы"
          onClick={onClose}
        ></button>
        {image ? (
          <img className="popup__img-sign" src={statusOk} alt="Знак" />
        ) : (
          <img className="popup__img-sign" src={statusErr} alt="Знак" />
        )}

        <p className="popup__img-sign-name">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
