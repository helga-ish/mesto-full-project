import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, buttonText}) {

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setNameUser(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, isOpen]); 

    const [nameUser, setNameUser] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setNameUser(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        return onUpdateUser({
            name: nameUser,
            about: description,
          });
    }


    return (
        <PopupWithForm
            title = 'Редактировать профиль'
            name = 'edit'
            buttonText={buttonText}
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
        >
            <input 
                type="text" 
                className="form__field form__field_type_name" 
                id="name-input" 
                name="inputName" 
                placeholder="Имя" 
                minLength="2" 
                maxLength="40" 
                required 
                value={nameUser || ''} 
                onChange={handleNameChange}
            />

            <span className='form__field-error name-input-error'></span>

            <input 
                type="text" 
                className="form__field form__field_type_about" 
                id="about-input" 
                name="inputAbout" 
                placeholder="Обо мне" 
                minLength="2" 
                maxLength="200" 
                required 
                value={description || ''} 
                onChange={handleDescriptionChange}
            />
            
            <span className='form__field-error about-input-error'></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;