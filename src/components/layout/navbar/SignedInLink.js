import React from 'react';
import { NavLink } from 'react-router-dom';


const LoggedIn = () => {
  return (
    <ul className="right">
       <li> <NavLink to="/chat">Dashboard</NavLink></li>
       <li> <NavLink to="/logout">LogOut</NavLink></li>
       <li> <NavLink to="/" className="btn btn-floating green lighten-1">TA</NavLink></li>
    
    </ul>
   )
  }
export default LoggedIn;


// import PropTypes from 'prop-types';