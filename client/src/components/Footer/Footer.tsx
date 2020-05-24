import React from 'react';
import { NavLink } from 'react-router-dom';
 
const Footer = () => {
    return (
       <div className="footer container">
           <div className="footer__left">
            <NavLink to="/">
                <img src='/logo.png' alt="Логотип" className="footer__logo"/>
            </NavLink>
            <div className="footer__menu">
                <NavLink to="/" className="footer__link">Главная</NavLink>
                <NavLink to="/reservation" className="footer__link">Бронирования</NavLink>
            </div>
          </div>
          <div className="footer__right">
              <span className="footer__phone">
                Касса театра: <a href="tel:55-55-12">55-55-12</a>
              </span>
              <span className="footer__mail">
                  Электронная почта: <a href="mailto:theatre@theatre.ru">theatre@theatre.ru</a>
              </span>
          </div>
       </div>
    );
}
 
export default Footer;