import React from "react";
import { PopupWithForm } from './PopupWithForm.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export const EditProfilePopup = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API его данные будут в инпутах
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit-profile" heading="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <>
        <input id="name" type="text" name="name" value={name || ''} onChange={handleChangeName} className="popup__input popup__input_type_name" placeholder="Введите имя"
          minLength="2" maxLength="40" required />
        <span className="popup__error popup__error_type_name"></span>
        <input id="about-yourself" type="text" name="aboutYourself" value={description || ''} onChange={handleChangeDescription}
          className="popup__input popup__input_type_about-yourself" placeholder="Введите информацию о себе" minLength="2"
          maxLength="200" required />
        <span className="popup__error popup__error_type_aboutYourself"></span>
      </>
    </PopupWithForm>
  )
}