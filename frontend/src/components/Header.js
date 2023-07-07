import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

function Header({loggedIn, email, onClick}) {

    

const location = useLocation();

const [isActive, setIsActive] = React.useState(false);
function handleActiveState() {
    setIsActive(true);
}
function handleInactiveState() {
    setIsActive(false);
}

const classNameForHeaderList = `header__list ${isActive ? 'header__list_type_active' : ''}`;
const classNameForBurgerMenu = `header__burger-menu ${!isActive ? 'header__burger-menu_type_active' : ''}`;


    return(
        <header className="header">
            

            {location.pathname === '/sign-up' ? (
            <Link className='header__link' to="/sign-in">Войти</Link>) :
            loggedIn ? (
                <div>
                    <ul className={classNameForHeaderList}>
                        <li className='header__email'>{ email }</li>
                        <li className='header__link'><button className='header__link_type_signout' onClick={onClick}>Выйти</button></li>
                    </ul>
                    <div className={classNameForBurgerMenu} onClick={!isActive ? handleActiveState : handleInactiveState}></div>
                </div>
            ) : (
                    <Link className='header__link' to="/sign-up">Зарегистрироваться</Link>
            )
            }

            <img className="logo" src={logo} alt="логотип mesto" />
        </header>
    )
}

export default Header;