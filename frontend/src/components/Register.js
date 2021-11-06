import React, { useState } from "react";
import Header from "./Header";
import FormLinkEnter from "./FormLinkEnter";
import Form from "./Form";

function Register({ onRegister }) {
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

    onRegister({ email: inputValue.email, password: inputValue.password });
  };

  return (
    <div className="page">
      <Header btnLink="Войти" pathLink="/sign-in" />
      <Form
        title="Регистрация"
        btnName="Зарегистрироваться"
        value={inputValue}
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <FormLinkEnter pathLink="/sign-in" />
      </Form>
    </div>
  );
}

export default Register;
