import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({ loggedIn }) => (
  <div>
    {!loggedIn ? (
      <nav>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    ) : (
      <nav>
        <NavLink to="/logout">Logout</NavLink>
      </nav>
    )}
  </div>
);

NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default NavBar;
