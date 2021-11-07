export const BASE_URL = "https://api.place-tmn.students.nomoredomains.work";

// Проверка ответа =========================================================
export const checkRespons = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка № ${res.status}  Текст ошибки: ${res.statusText}`);
};

// Регистрация пользователя Post запрос=====================================
export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkRespons);
};

// Авторизация пользователя Post запрос=====================================
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkRespons);
};

// Token Get запрос данных по пользователю==================================
export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRespons);
};
