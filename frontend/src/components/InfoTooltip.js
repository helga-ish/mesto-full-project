import React from "react";
import success from '../images/sign-up-success.svg';
import fail from '../images/sign-up-fail.svg'
import usePopupClose from "../hooks/usePopupClose";

export default function InfoTooltip({isSucceed, isOpen, onClose, onCloseAndNavigate}) {

    const className = `popup ${isOpen ? 'popup_active' : ''}`;
    usePopupClose(isOpen, onClose);

    return(
        <section className={className} id="popup-signup">
            <div className="popup__container">
            <button className="popup__toggle" type="button" onClick={isSucceed ? onCloseAndNavigate : onClose}></button>
                {isSucceed ? (
                    <div>
                        <img className="popup__signup-sign" src={success} alt="успешная регистрация"/>
                        <p className="popup__signup-message">Вы успешно зарегистрировались!</p>
                    </div>
                ) : (
                    <div>
                        <img className="popup__signup-sign" src={fail} alt="неуспешная регистрация"/>
                        <p className="popup__signup-message">Что-то пошло не так! Попробуйте ещё раз.</p>
                    </div>
                )}
            </div>
        </section>
                
    )
}