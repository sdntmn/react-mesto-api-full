import Card from "./Card";
import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleEditAvatarClick,
  handleCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__cover">
      <section className="profiles page__cover">
        <div className="profile">
          <div className="profile__info">
            <div className="profile__data">
              <div className="profile__change-avatar">
                <img
                  className="profile__avatar "
                  src={currentUser.avatar}
                  alt="Фото пользователя"
                />
                <button
                  className="profile__opened-avatar"
                  type="button"
                  aria-label="Редактировать аватар"
                  onClick={handleEditAvatarClick}
                ></button>
              </div>

              <div className="profile__item">
                <div className="profile__item-name">
                  <h1 className="profile__item-info">{currentUser.name}</h1>
                  <button
                    className="profile__opened"
                    type="button"
                    aria-label="Редактировать"
                    onClick={handleEditProfileClick}
                  ></button>
                </div>
                <p className="profile__specialization">{currentUser.about}</p>
              </div>
            </div>
            <button
              className="profile__button"
              type="button"
              aria-label="Добавить"
              onClick={handleAddPlaceClick}
            ></button>
          </div>
        </div>
      </section>

      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
