import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export const Card = (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;  // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = props.card.likes.some(i => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`);

  return (
    <article className="card">
      {isOwn && <button type="button" aria-label="Удалить" className="card__delete-button" onClick={props.onCardDelete} />}
      <img className="card__image" src={props.link} alt={props.name} onClick={props.onCardClick} />
      <div className="card__caption">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like">
          <button type="button" aria-label="Лайк" className={cardLikeButtonClassName} onClick={props.onCardLike}></button>
          <span className="card__likes-counter">{props.likes}</span>
        </div>
      </div>
    </article>
  )
}