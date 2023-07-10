import React from "react";
import PageWithForm from "./PageWithForm";
import { Link } from "react-router-dom";
import * as auth from '../utils/auth.js';
import InfoTooltip from "./InfoTooltip";

export default function Register({isInfoToolTipPopupOpen, isSucceed, handleInfoToolTipClick, closeInfoToolTipPopup, onCloseAndNavigate, handleSucceed, handleNotSucceed}) {


    
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: '',
      })

    
      const handleChange = (e) => {
        const {name, value} = e.target;
    
        setFormValue({
          ...formValue,
          [name]: value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
          auth.register(formValue.email, formValue.password)
                .then((res) => {
                  handleSucceed();
                })
                .catch((err) => {
                  console.log(err);
                  handleNotSucceed();
                })
                .finally(() => {
                  handleInfoToolTipClick()
                })
      }

    return(
        <PageWithForm
          name = 'register'
          title = 'Регистрация'
          buttonTitle= 'Зарегистрироваться'
          onChange={handleChange}
          onSubmit={handleSubmit}
          formValueEmail={formValue.email}
          formValuePassword={formValue.password} 
          >
            <p className="register-to-login">Уже зарегистрированы? <Link className="register-to-login_type_link" to='/signin'>Войти</Link></p>
            <InfoTooltip
              isSucceed={isSucceed}
              isOpen={isInfoToolTipPopupOpen}
              onClose={closeInfoToolTipPopup}
              onCloseAndNavigate={onCloseAndNavigate}
            />
        </PageWithForm>

    )
} 