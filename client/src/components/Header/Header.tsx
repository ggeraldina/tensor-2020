import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Header = () => {
    return (
       <div>
          <NavLink to="/">Main</NavLink>
          <NavLink to="/reservation">Reservation</NavLink>
       </div>
    );
}
 
export default Header;