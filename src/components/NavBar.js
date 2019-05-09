import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({ loggedIn }) => (
  <div>
    {!loggedIn ? (
      <nav>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        {/* temporary links */}
        <NavLink to="/chat">Chat</NavLink>
        <NavLink to="/">Home</NavLink>
      </nav>
    ) : (
      <nav>
        <NavLink to="/logout">Logout</NavLink>
        {/* temporary links */}
        <NavLink to="/chat">Chat</NavLink>
        <NavLink to="/">Home</NavLink>
      </nav>
    )}
  </div>
);

NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default NavBar;
