import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Header = () => {
    return (
       <div className="header">
          <NavLink to="/" className="header__link">Главная</NavLink>
          <NavLink to="/reservation" className="header__link">Бронирование</NavLink>
       </div>
    );
}
 
export default Header;