import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';
import '../index.css';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth.js';


function App() {
    

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({name:'', link:''});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    

    // succeed popup related

    const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);
    const [isSucceed, setIsSucceed] = React.useState(null);
    const navigate = useNavigate();
    function handleInfoToolTipClick() {
        setIsInfoToolTipPopupOpen(true);
    };
    function closeInfoToolTipPopup() {
        setIsInfoToolTipPopupOpen(false);
    }
    function onCloseAndNavigate() {
      setIsInfoToolTipPopupOpen(false);
      navigate('/sign-in', {replace: true});
    }
    function handleSucceed() {
        setIsSucceed(true);
    }
    function handleNotSucceed() {
        setIsSucceed(false);
    }
    function handleSignOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('sign-in', {replace: true});
    }

    // setting email in header related

    const [email, setEmail] = React.useState('');

    React.useEffect (() => {
        checkToken();
    }, [])

    const checkToken = () => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            auth.getEmail(token).then(({data}) => {
                    handleLogin();
                    setEmail(data.email);
                    navigate('/', {replace: true})
            })
            .catch((err) => console.log(err));
        }   
    }

    // loggedIn state related

    const [loggedIn, setLoggedIn] = React.useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
      }

    // getting info for main page

    React.useEffect(() => {
        api.getProfileUserInfo()
        .then((userData) => {
            setCurrentUser(userData);
        })
        .catch((error) => {
            console.error(`Ошибка загрузки данных пользователя с сервера: ${error}`);
        })
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
        .then((data) => {
            setCards(
                data.map((item) => ({
                    _id: item._id,
                    name: item.name,
                    link: item.link,
                    likes: item.likes,
                    owner: item.owner
                }))
                )
        })
        .catch((error) => {
            console.error(`Ошибка загрузки данных с сервера: ${error}`);
          });
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((error) => {
            console.error(`Ошибка загрузки данных с сервера: ${error}`);
        });
    }

    function handleDeleteClick(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter(function(c) {
                return c._id !== card._id;
            }))
        })
        .catch((error) => {
            console.error(`Ошибка загрузки данных с сервера: ${error}`);
        });
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };


    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard({name:'', link:''});
    }

    function handleUpdateUser(object) {
        setIsLoading(true);
        api.changeProfileUserInfo(object)
        .then((newUserData) => {
            setCurrentUser(newUserData)
            closeAllPopups();
        })
        .catch((error) => {
            console.error(`Ошибка загрузки данных пользователя с сервера: ${error}`);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    function handleUpdateAvatar(link) {
        setIsLoading(true);
        api.editAvatar(link)
        .then((dataAvatar) => {
            setCurrentUser(dataAvatar);
            closeAllPopups();
        })
        .catch((error) => {
            console.error(`Ошибка загрузки данных аватара пользователя с сервера: ${error}`);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    function handleAddPlaceSubmit(object) {
        setIsLoading(true);
        api.addCard(object)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((error) => {
            console.error(`Ошибка загрузки данных нового места с сервера: ${error}`);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    //  loading

    const [isLoading, setIsLoading] = React.useState(false);



  return (
    <CurrentUserContext.Provider value={currentUser}>
            <div>
                <Header  loggedIn={loggedIn} email={email} onClick={handleSignOut}/>
                <Routes>
                    <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
                        <Route path="/" element={<Main 
                                                    onEditProfile={handleEditProfileClick}
                                                    onAddPlace={handleAddPlaceClick}
                                                    onEditAvatar={handleEditAvatarClick}
                                                    onCardClick={handleCardClick}
                                                    onCardLike={handleCardLike}
                                                    onDeleteClick={handleDeleteClick}
                                                    cards = {cards}
                                                />} 
                        />
                    </Route>
                    <Route   path="/sign-in" element={
                    <Login 
                        handleLogin={handleLogin}
                        isInfoToolTipPopupOpen={isInfoToolTipPopupOpen}
                        isSucceed={isSucceed}
                        handleInfoToolTipClick={handleInfoToolTipClick}
                        closeInfoToolTipPopup={closeInfoToolTipPopup}
                        handleNotSucceed={handleNotSucceed}
                        />} />
                    <Route   path="/sign-up" element={
                    <Register
                        isInfoToolTipPopupOpen={isInfoToolTipPopupOpen}
                        isSucceed={isSucceed}
                        handleInfoToolTipClick={handleInfoToolTipClick}
                        closeInfoToolTipPopup={closeInfoToolTipPopup}
                        onCloseAndNavigate={onCloseAndNavigate}
                        handleSucceed={handleSucceed}
                        handleNotSucceed={handleNotSucceed}
                    />} />
                </Routes>


                <EditProfilePopup 
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
                />
            
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
                />
            
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    buttonText={isLoading? 'Сохранение...' : 'Отправить'}
                />
            
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <Footer />

            </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
