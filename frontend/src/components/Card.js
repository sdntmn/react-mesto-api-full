import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки=================
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную=====================================================
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "element_is-visible" : ""
  }`;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <li className="element">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="element__img"
        src={card.link}
        alt={card.name}
        onClick={(_) => onCardClick(card)}
      />
      <div className="element__title">
        <h2 className="element__name-mesto">{card.name}</h2>
        <div className="element__counting-likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="element__number-likes">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
