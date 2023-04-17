import React from "react";
import iconSucces from '../images/status-icon/success.svg';
import iconFail from '../images/status-icon/fail.svg';

export const InfoTooltip = (props) => {
  const text = props.status === "success" ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
  const icon = props.status === "success" ? iconSucces : iconFail;
  const altText = props.status === "success" ? 'Ура!' : 'Эхх';

  return (
    <div className={`popup popup__info-tooltip ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container popup__container_info-tooltip">
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={props.onClose}></button>
        <img className="popup__status-icon" src={icon} alt={altText}></img>
        <h2 className="popup__heading popup__heading_info-tooltip">{text}</h2>
      </div>
    </div>
  )
}
