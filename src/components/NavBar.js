import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = () => (
    <div>
      <nav>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/login'>Login</NavLink>
      </nav>
    </div>
);

export default NavBar;
