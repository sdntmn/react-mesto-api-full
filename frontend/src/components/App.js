import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
// Popup-ы =================================================================
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

import InfoTooltip from "./InfoTooltip";
// Основные компоненты =====================================================
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// Отдельные страницы ======================================================
import Login from "./Login";
import Register from "./Register";
// Класс Api ===============================================================
import api from "../utils/api";
// Контекст (передаем в него данные пользователя) ==========================
import { CurrentUserContext } from "../contexts/CurrentUserContext";
// Компонент высшего порядка - НОС. Защита маршрутов =======================
import ProtectedRoute from "./ProtectedRoute";
// Импорт всех констант из файла auth.js ===================================
import * as auth from "../utils/auth";

function App() {
  // Первоначальное состояние попапа Profile (False - закрыт)===============
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  // Обработчик состояние попапа Profile (Меняем на True)===================
  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  };

  // Первоначальное состояние попапа Place (False - закрыт)=================
  const [isAddPlacePopupOpen, setPlacePopupOpen] = useState(false);

  // Обработчик состояние попапа Place (Меняем на True)=====================
  const onAddPlace = () => {
    setPlacePopupOpen(true);
  };
  // Первоначальное состояние попапа Avatar (False - закрыт)================
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);

  // Обработчик состояние попапа Avatar (Меняем на True)====================
  const onEditAvatar = () => {
    setAvatarPopupOpen(true);
  };

  // Первоначальное состояние попапа Foto (Null)============================
  const [selectedCard, setSelectedCard] = useState(null);

  // Обработчик состояние попапа Foto (Меняем на полученный props)==========
  const onCardClick = (card) => {
    setSelectedCard(card);
  };

  //Синхронный вывод данных User и Card ====================================
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory();

  // Состояние пользователя — авторизован или нет. Изначально - нет (False)
  const [loggedIn, setLoggedIn] = useState(false);

  // Первоначальное состояние InfoToolTip ==================================
  const [infoTool, setInfoTool] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      api
        .renderFirstData()
        .then(([currentUser, cards]) => {
          setCards(cards);
          setCurrentUser(currentUser);
        })
        .catch((error) => {
          console.log(`Ошибка получения данных ${error}`);
        });
    }
  }, [loggedIn]);

  // Закрытие попапа (смена состояния на - False или Null)==================
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTool(false);
  }
  // Исправление(смена) данных пользователя=================================
  function handleUpdateUser(data) {
    api
      .changeDataUser(data)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка получения данных ${error}`);
      });
  }

  // Смена аватара пользователя=============================================
  function handleUpdateAvatar(data) {
    api
      .changeAvatarUser(data)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка данных ${error}`);
      });
  }

  // Лайк карточки =========================================================
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(card);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((error) => {
        console.log(`Ошибка данных лайков ${error}`);
      });
  }

  // Удаление карточки =====================================================
  function handleCardDelete(card) {
    api
      .deleteCardUser(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        /* Было setCards(cards.filter((c) => c._id !== card._id));
        Рекомендация: изменять стейт лучше с помощью стейт-колбэка:
        Тут в стейт-функцию передается стейт-колбэк, в котором 1м аргументом идет текущее состояние переменной. Вот ее и нужно использовать (менять) при изменениях,  так как бывают ситуации, что где-то уже изменили эту переменную, но еще не обновились данные в ней, а Вы попытаетесь изменить старые данные, которые неактуальны больше */
      })
      .catch((error) => {
        console.log(`Ошибка удаления карточки ${error}`);
      });
  }

  // Добавление карточки ===================================================
  function handleAddPlaceSubmit(userCard) {
    api
      .setCardUser(userCard)
      .then((newArrCard) => {
        setCards([newArrCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка данных карточки ${error}`);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getToken(token) //функция авторизации
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          history.push("/");
        })
        .catch((error) => {
          console.log(`Ошибка данных ${error}`);
        });
    }
  }, [history]);

  const [message, setMessage] = useState("");
  const [image, setImage] = useState(false);

  // Регистрация нового пользователя =======================================
  function onRegister({ email, password }) {
    return auth
      .register({ email, password })
      .then((res) => {
        setMessage("Вы успешно зарегистрировались");
        setImage(true);

        setTimeout(function () {
          closeAllPopups();
        }, 2000);

        history.push("/sign-in");

        return res;
      })
      .catch((error) => {
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setImage(false);

        if (error.status === 400) {
          return console.log("не передано одно из полей");
        }
      })
      .finally(() => {
        setInfoTool(true);
      });
  }

  // Вход пользователя =======================================
  function onLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(`Ошибка данных ${error}`);
      });
  }

  // Выход пользователя
  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  // Обработчик закрытия по Esc=============================================
  /* Объявляем функцию внутри useEffect, чтобы она не теряла свою ссылку при обновлении компонента.
  И не забываем удалять обработчик в clean up функции через return
  А также пустой массив зависимостей, чтобы только 1 раз навесить и не трогать
  его при обновлении компонента. Он будет удаляться только при размонтировании компонента.
*/
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Route exact path="/">
          <Header
            email={currentUser.email}
            btnLink="Выйти"
            pathLink="/sign-in"
            onEndSession={onSignOut}
          />
        </Route>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            setCards={setCards}
            handleEditProfileClick={onEditProfile}
            handleAddPlaceClick={onAddPlace}
            handleEditAvatarClick={onEditAvatar}
            handleCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleAddPlaceSubmit}
        ></AddPlacePopup>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        <PopupWithForm
          onClose={closeAllPopups}
          name="delete_card"
          title="Вы уверены?"
          btnName="Да"
        ></PopupWithForm>
        <InfoTooltip
          isOpen={infoTool}
          message={message}
          onClose={closeAllPopups}
          image={image}
        ></InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
