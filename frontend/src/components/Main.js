import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js'; 

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onDeleteClick, cards }) {

    
    const currentUser = React.useContext(CurrentUserContext);


    return(
        <main className="main">
            <section className="profile">
                <div className="profile__container">
                    <img className="profile__avatar" src={ currentUser.avatar } alt="фото автора" />
                    <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__field-name">{ currentUser.name }</h1>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                    <p className="profile__field-about">{ currentUser.about }</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>

            <section className="gallery">
                <ul className="gallery__list">
                    {cards.map((item) => (
                        <Card
                            key={ item._id }
                            card={ item }
                            onCardClick = {onCardClick}
                            onCardLike = {onCardLike}
                            currentUser = {currentUser}
                            onDeleteClick = {onDeleteClick}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );

    
}

export default Main;