import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onDeleteClick}) {

    const currentUser = React.useContext(CurrentUserContext);

    function handleDeleteClick() {
        onDeleteClick(card)
    }
    function handleLikeClick() {
        onCardLike(card);
        console.log(card);
    }

    function handleClick() {
        onCardClick(card);
    }

    const isLiked = card.likes.some(i => i === currentUser._id);
    const isOwn = card.owner === currentUser._id;

    const cardLikeButtonClassName = ( 
        `card__like ${isLiked && 'card__like_active'}` 
      );

    return (
        <li className="card">
            <img className="card__image" src={ card.link } alt={ card.name } onClick={ handleClick } />
            {isOwn && <button className="card__remove" type="button" onClick={handleDeleteClick}/>}
            <div className="card__container">
                <h2 className="card__name">{ card.name }</h2>
                <div className="card__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <h3 className="card__like-count">{ card.likes.length }</h3>
                </div>
            </div>
        </li>
    );
}

export default Card;