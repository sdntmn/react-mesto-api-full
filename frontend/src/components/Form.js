import React from "react";

export default function Form({
  title,
  btnName,
  message,
  value,
  onSubmit,
  onChange,
  name,
  children,
}) {
  return (
    <div className="form">
      <form
        className="form__data"
        id={`form_${name}`}
        name={`${name}`}
        onSubmit={onSubmit}
      >
        <fieldset className="form__grouping">
          <legend className="form__title">{title}</legend>
          <input
            className="form__input "
            id="form-email-reg"
            minLength="2"
            maxLength="30"
            placeholder="Email"
            type="email"
            name="email"
            value={value.email}
            onChange={onChange}
            required
          />
          <span className="popup__input-error name-input-error">{message}</span>
          <input
            className="form__input popup__input_value_link"
            id="form-link-reg"
            placeholder="Пароль"
            type="password"
            name="password"
            value={value.password}
            onChange={onChange}
            required
          />
          <span className="popup__input-error link-input-error">{message}</span>
        </fieldset>
        <button
          type="submit"
          className="form__button"
          aria-label="Зарегистрироваться"
        >
          {btnName}
        </button>
        {children}
      </form>
    </div>
  );
}
