import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({ title, name, children, buttonText, isOpen, onClose, onSubmit }) {

    const className = `popup ${isOpen ? 'popup_active' : ''}`;
    usePopupClose(isOpen, onClose);

    return(
        <section className= {className} id={`popup-${name}`}>
            <div className="popup__container">
                <button className="popup__toggle" type="button" onClick={onClose} />
                <form className="form" name={`${name}Form`} onSubmit={ onSubmit }>
                    <h2 className="form__heading">{`${title}`}</h2>
                    <fieldset className="form__fields">
                        {children}
                    </fieldset>
                    <button type="submit" className="form-button">{ buttonText }</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;