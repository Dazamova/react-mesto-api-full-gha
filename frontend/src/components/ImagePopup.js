import React from "react";
export const ImagePopup = (props) => {
  return (
    <div className={`popup popup_open-card ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_open-card">
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={props.onClose}></button>
        <img className="popup__card-image" src={props.card.link} alt={props.card.name} />
        <p className="popup__card-title">{props.card.name}</p>
      </div>
    </div>
  )
}