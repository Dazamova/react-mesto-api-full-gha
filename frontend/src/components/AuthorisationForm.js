import React from "react";
import { NavLink } from 'react-router-dom';

export const AuthorisationForm = (props) => {

  return (
    <div className="authorisation">
      <div className="authorisation__container">
        <h2 className="authorisation__heading">{props.header}</h2>
        <form name="authorisation-form" className="authorisation__form" onSubmit={props.onSubmit}>
          <div className="authorisation__inputs">
            {props.children}
          </div>
          <button name="submit" type="submit" className="authorisation__submit-button">{props.buttonText}</button>
        </form>
        <span className={`authorisation__login-offer ${props.isDisplay ? 'authorisation__login-offer_display' : ''}`}>Уже зарегистрированы? <NavLink className="authorisation__link" to="/sign-in">Войти</NavLink>
        </span>
        {/* <Routes>
          <Route path="sign-up" element={
            <>
              <span className="authorisation__login-offer authorisation__login-offer_display">Уже зарегистрированны?</span>
              <NavLink to="/sign-in" className="authorisation__link">Войти</NavLink>
            </>
          } />
        </Routes> */}
      </div>
    </div>
  )
}
