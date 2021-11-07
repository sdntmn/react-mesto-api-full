import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card && "popup_is-opened"}`} id="popup_foto_mesto">
      <div className="popup__container-foto">
        <figure className="popup__foto">
          <button
            className="popup__close"
            type="button"
            aria-label="Кнопка закрытия формы"
            onClick={onClose}
          ></button>
          <img
            className="popup__img"
            src={card ? card.link : ""}
            alt={card ? card.name : ""}
          />
          <figcaption className="popup__img-name">
            {card ? card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
