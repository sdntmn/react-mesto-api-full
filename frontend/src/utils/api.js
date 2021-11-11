export class Api {
  constructor(configApi) {
    this._url = configApi.baseUrl; // тело конструктора
    this._headers = configApi.headers;
  }

  // Проверка работы промиса =================================================
  _checkResponsPromise(res) {
    return res.ok
      ? res.json()
      : Promise.reject(
          console.log(`Ошибка № ${res.status}  Текст ошибки: ${res.statusText}`)
        );
  }
  // Получить список всех карточек в виде массива (GET) ======================
  getInitialCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    }).then(this._checkResponsPromise);
  }

  // Добавить карточку (POST) ================================================
  setCardUser(userCard) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: userCard.name,
        link: userCard.link,
      }),
    }).then(this._checkResponsPromise);
  }

  // Получить данные пользователя (GET) ======================================
  getDataUser(dataUser) {
    return fetch(this._url + "/users/me ", {
      headers: this._headers,
      body: JSON.stringify(dataUser),
    }).then(this._checkResponsPromise);
  }

  //Для синхронного первоначального вывода данных User и Card ================
  renderFirstData() {
    return Promise.all([this.getDataUser(), this.getInitialCards()]);
  }

  // Проверка данных лайка карточки ==========================================
  changeLikeCardStatus(cardID, like) {
    return fetch(this._url + `/cards/likes/${cardID}`, {
      method: like ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._checkResponsPromise);
  }

  // Заменить данные пользователя (PATCH) ====================================
  changeDataUser(data) {
    return fetch(this._url + "/users/me ", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponsPromise);
  }

  // Заменить аватар пользователя (PATCH) ====================================
  changeAvatarUser(data) {
    return fetch(this._url + `/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponsPromise);
  }

  // Удалить карточку пользователя (DELETE) ====================================
  deleteCardUser(cardID) {
    return fetch(this._url + `/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        _id: cardID,
      }),
    }).then(this._checkResponsPromise);
  }
}

// + Запрос к Api ============================================================
const api = new Api({
  baseUrl: "https://api.place-tmn.students.nomoredomains.work",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default api;
