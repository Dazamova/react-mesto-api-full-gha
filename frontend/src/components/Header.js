import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

export const Header = (props) => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className="header__authorisation-container">
        <Routes>
          <Route path="sign-up" element={<NavLink to="/sign-in" className="header__link">Войти</NavLink>} />
          <Route path="sign-in" element={<NavLink to="/sign-up" className="header__link">Регистрация</NavLink>} />
          <Route path="/" element={
            <>
              <span className="header__email">{props.email}</span>
              <NavLink to="/sign-in" className="header__link header__link_type_main-page" onClick={props.onSignOut}>Выйти</NavLink>
            </>
          } />
        </Routes>
      </div>
    </header>
  )
}
