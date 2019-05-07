import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({ loggedIn }) => (
    <div>
      {!loggedIn ? (
          <nav>
            <Link to="/" className="left">logo</Link>
            <NavLink to="/register" className="">Register</NavLink>
            <NavLink to="/login" className="">Login</NavLink>

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
