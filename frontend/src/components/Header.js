import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../images/Vector.svg";
import { Route, Switch } from "react-router-dom";

// Заголовок сайта =========================================================
function Header({ email, pathLink, btnLink, onEndSession }) {
  return (
    <header className="header page__cover">
      <img className="logo" src={logoPath} alt="Логотип сайта" />
      <div className="header__auth">
        <Switch>
          <Route exact path="/">
            <p className="header__email header__email_is-visibility">{email}</p>
            <Link to={pathLink} className="header__link" onClick={onEndSession}>
              {btnLink}
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to={pathLink} className="header__link" onClick={onEndSession}>
              {btnLink}
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link to={pathLink} className="header__link" onClick={onEndSession}>
              {btnLink}
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
