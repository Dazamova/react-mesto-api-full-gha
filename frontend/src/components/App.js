import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../index.css';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { PopupWithForm } from './PopupWithForm.js';
import { ImagePopup } from './ImagePopup.js';
import { Card } from "./Card.js";
import { Api } from "../utils/api.js";
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import img from "../images/profile/image.jpg";
import { Login } from './Login.js';
import { Register } from './Register.js';
import { InfoTooltip } from './InfoTooltip.js';
import { ProtectedRoute } from './ProtectedRoute.js';
import { authApi } from '../utils/authApi.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({}); //хранит в себе карточку, которую кликнули
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: 'Имя', about: 'Информация о себе', avatar: img, email: "" });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = React.useState("");
  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(clickedCard) {
    setIsImagePopupOpen(true);
    setSelectedCard(clickedCard);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      Api.dislike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      }).catch(rej => {
        console.log(rej)
      })
    } else {
      Api.like(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      }).catch(rej => {
        console.log(rej)
      })
    }
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id).then(
      setCards(state => state.filter(c => c._id !== card._id))
    ).catch(rej => {
      console.log(rej)
    })
  }

  function handleUpdateUser(formData) {
    Api.editProfile(formData).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch(rej => {
      console.log(rej)
    })
  }

  function handleUpdateAvatar(formData) {
    Api.editAvatar(formData).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch(rej => {
      console.log(rej)
    })
  }

  function handleAddPlaceSubmit(formData) {
    Api.addCard(formData).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(rej => {
      console.log(rej)
    })
  }

  function handleSignUp(formData) {
    authApi.signUp(formData).then(() => {
      setIsInfoTooltipOpen(true);
      setInfoTooltipStatus("success");
      navigate("/sign-in");
    }).catch(() => {
      setIsInfoTooltipOpen(true);
      setInfoTooltipStatus("error");
    })
  }

  // авторизация пользователя - signIn
  function handleSignIn(formData) {
    authApi.signIn(formData).then((data) => {
      // const token = data.token;
      // localStorage.setItem("jwt", token);
      // authApi.checkAuth(token).then((user) => {
      //   setCurrentUser((prevState) => ({ ...prevState, email: user.data.email }))
      // }).catch(rej => {
      //   console.log(rej)
      // });
      setCurrentUser((prevState) => ({ ...prevState, email: formData.email }))
      setIsLoggedIn(true);
      navigate("/");
    }).catch(() => {
      setIsInfoTooltipOpen(true);
      setInfoTooltipStatus("error");
    })
  }

  //проверка наличия токена
  React.useEffect(() => {
    // const jwt = localStorage.getItem('jwt');
    // if (jwt) {
    authApi.checkAuth().then((user) => {
      setCurrentUser((prevState) => ({ ...prevState, email: user.email }));
      setIsLoggedIn(true);
      navigate("/");
    }).catch(rej => {
      console.log(rej)
    })
    // }
  }, [])

  function handleSignOut() {
    authApi.signOut().then(() => {
      setCurrentUser((prevState) => ({ ...prevState, email: '' }));
      setIsLoggedIn(false);
      navigate("/sign-in")
    }).catch(rej => {
      console.log(rej)
    })
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        Api.getUserInfo(),
        Api.getInitialCards()
      ]).then(([userInfo, cards]) => {
        setCurrentUser((prevState) => ({ ...prevState, ...userInfo }));
        setCards(cards);
      }).catch(rej => {
        console.log(rej)
      })
    }
  }, [isLoggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <body style={{ background: 'black' }}>
        <div className="main-page">
          <Header email={currentUser.email} onSignOut={handleSignOut} />
          <Routes>
            <Route path="sign-up" element={<Register onSubmit={handleSignUp} />} />
            <Route path="sign-in" element={<Login onSubmit={handleSignIn} />} />
            <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}>
                  <section className="cards">
                    {cards.map((card) =>
                      <Card card={card} key={card._id} name={card.name} link={card.link} likes={card.likes.length} onCardLike={() => handleCardLike(card)} onCardDelete={() => handleCardDelete(card)} onCardClick={() => handleCardClick(card)}></Card>
                    )}
                  </section>
                </Main>
                <Footer />
              </>
            </ProtectedRoute>}>
            </Route>
          </Routes>
          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={infoTooltipStatus} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <PopupWithForm name="confirm" heading="Вы уверены?" buttonText="Да" onClose={closeAllPopups} />
          <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
        </div>
      </body>
    </CurrentUserContext.Provider>
  );
}
export default App;
