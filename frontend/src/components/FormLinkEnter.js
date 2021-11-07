import React from "react";
import { Link } from "react-router-dom";

export default function FormLinkEnter({ pathLink }) {
  return (
    <div className="form__link-wrapper">
      <p className="form__text">Уже зарегистрированы?</p>
      <Link to={pathLink} className="form__link">
        Войти
      </Link>
    </div>
  );
}
