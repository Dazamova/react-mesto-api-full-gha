import React from "react";
import { PopupWithForm } from './PopupWithForm.js';

export const AddPlacePopup = (props) => {
  const [place, setPlace] = React.useState('');
  const [image, setImage] = React.useState('');

  React.useEffect(() => {
    if(props.isOpen){
      setPlace('');
      setImage('');
    }
  }, [props.isOpen])

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeImage(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      place,
      image,
    });
  }

  return (
    <PopupWithForm name="add-card" heading="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <>
        <input id="place" value={place} type="text" name="place" className="popup__input popup__input_type_place" onChange={handleChangePlace} placeholder="Название"
          minLength="2" maxLength="30" required />
        <span className="popup__error popup__error_type_place"></span>
        <input id="image" value={image} type="url" name="image" className="popup__input popup__input_type_image" onChange={handleChangeImage}
          placeholder="Ссылка на картинку" required />
        <span className="popup__error popup__error_type_image"></span>
      </>
    </PopupWithForm>
  )
}