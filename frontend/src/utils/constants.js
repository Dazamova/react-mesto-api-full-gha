export const popupEditProfileSelector = '.popup_edit-profile';
export const editButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileAboutYourself = document.querySelector('.profile__about-yourself');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileAvatarContainer = document.querySelector('.profile__avatar-container');
export const formAddCard = document.forms.addCard;
export const popupAddCardSelector = '.popup_add-card';
export const addButton = document.querySelector('.profile__add-button');
export const popupUpdateAvatarSelector = '.popup_update-avatar';
export const formUpdateAvatar = document.forms.updateAvatar;
export const popupOpenCardSelector = '.popup_open-card';
export const cardsContainerSelector = '.cards';
export const popupWithConfirmationSelector = '.popup_confirm';
export const cardSelector = '.card-template';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const apiConfig = {
  baseUrl: 'https://mesto-travel.nomoredomains.monster',
  headers: {
    // 'Authorization': '08ca9b9b-5109-4975-909a-0b8f1b0ed24a',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export const authConfig = {
  baseUrl: 'https://mesto-travel.nomoredomains.monster',
  headers:{
    'Content-Type': 'application/json'
  }
}
