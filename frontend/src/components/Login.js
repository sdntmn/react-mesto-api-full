import React, { useState } from "react";
import Header from "./Header";
import Form from "./Form";

function Login({ onLogin }) {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  // Обработчик изменения инпута обновляет стейт
  const handleChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    onLogin({ email: inputValue.email, password: inputValue.password });
  };

  return (
    <div className="page">
      <Header btnLink="Регистрация" pathLink="/sign-up"></Header>
      <Form
        title="Вход"
        btnName="Войти"
        value={inputValue}
        onSubmit={handleSubmit}
        onChange={handleChange}
      ></Form>
    </div>
  );
}

export default Login;
