import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export const Main = (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__headline">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" aria-label="Редактировать" className="profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__about-yourself">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      {props.children}
    </main>
  )
}
