import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, buttonText}) {


    const textInputName = React.useRef();
    const textInputLink = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        return onAddPlace({
            name: textInputName.current.value,
            link: textInputLink.current.value,
          });
    }

    React.useEffect(() => {
        textInputName.current.value = '';
        textInputLink.current.value = '';
      }, [isOpen])

    return (
        <PopupWithForm
            title = 'Новое место'
            name = 'add'
            buttonText = {buttonText}
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit={handleSubmit}
        >

            <input 
                ref={textInputName} 
                type="text" 
                className="form__field form__field_type_card-name" 
                id="card-name-input" 
                name="inputCardName" 
                placeholder="Название" 
                minLength="2" 
                maxLength="30" 
                required 
            />

            <span className='form__field-error card-name-input-error'></span>

            <input 
                ref={textInputLink} 
                type="url" 
                className="form__field form__field_type_link" 
                id="link-input" 
                name="inputLink" 
                placeholder="Ссылка" 
                required 
            />

            <span className='form__field-error link-input-error'></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;