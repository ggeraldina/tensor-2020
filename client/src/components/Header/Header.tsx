import React from 'react';
import { NavLink } from 'react-router-dom';
 
const Header = () => {
    return (
       <div className="header container">
          <div className="header__left">
          <NavLink to="/">
             <img src='/logo.png' alt="Логотип" className="header__logo"/>
          </NavLink>
          </div>
          <div className="header__right">
            <NavLink to="/" className="header__link">Главная</NavLink>
            <NavLink to="/reservation" className="header__link">Бронирования</NavLink>
          </div>
       </div>
    );
}
 
export default Header;