import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({ loggedIn }) => (
    <div>
    <ul className="right">
    <li>   <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/login">Login</NavLink></li>
    </ul>
    </div>
);

NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default NavBar;
