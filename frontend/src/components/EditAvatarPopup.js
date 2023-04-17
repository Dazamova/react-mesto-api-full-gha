import React from "react";
import { PopupWithForm } from './PopupWithForm.js';

export const EditAvatarPopup = (props) => {
  const avatarRef = React.useRef(null);

  function handleChange() {
    avatarRef.current.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name="update-avatar" heading="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <>
        <input id="avatar" ref={avatarRef} type="url" name="avatar" className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на картинку" onChange={handleChange} required />
        <span className="popup__error popup__error_type_avatar"></span>
      </>
    </PopupWithForm>
  )
}