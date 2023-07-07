import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({card, onClose}) {

    usePopupClose(card.link, onClose);

    return(
        <section className={`popup ${ card.link && 'popup_active'}`} id='popup-card'>
            <div className="popup-card">
                <img className="popup-card__image" src={card.link} alt={card.name}/>
                <h2 className="popup-card__heading">{ card.name }</h2>
                <button className="popup__toggle" type="button" onClick={onClose}></button>
            </div>
        </section>
    );
}

export default ImagePopup;