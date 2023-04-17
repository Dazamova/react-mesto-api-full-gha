import React from "react";
import { AuthorisationForm } from "./AuthorisationForm.js";

export const Register = (props) => {
  const { onSubmit } = props;
  const [formValue, setFormValue] = React.useState('', '');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValue);
  }

  return (
    <AuthorisationForm header="Регистрация" buttonText="Зарегистрироваться" onSubmit={handleSubmit} isDisplay={true}>
      <>
        <input id="email" type="email" name="email" value={formValue.email || ''} onChange={handleChange} className="authorisation__input authorisation__input_type_email" placeholder="Email"
          minLength="2" maxLength="40" required />
        <input id="password" type="password" name="password" value={formValue.password || ''} onChange={handleChange}
          className="authorisation__input authorisation__input_type_password" placeholder="Пароль" minLength="6"
          maxLength="10" required />
      </>
    </AuthorisationForm>
    // <Routes>
    //   <Route path="sign-up" element={
    //     <>
    //       <span className="authorisation__login-offer authorisation__login-offer_display">Уже зарегистрированны?</span>
    //       <NavLink to="/sign-in" className="authorisation__link">Войти</NavLink>
    //     </>
    //   } />
    // </Routes>
  )
}
