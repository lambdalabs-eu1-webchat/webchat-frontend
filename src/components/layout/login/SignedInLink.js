import React from 'react';
import { NavLink, Link } from 'react-router-dom';


const LoggedIn = () => {
  return (
    <ul className="right">
       <li> <NavLink to="/">Dashboard</NavLink></li>
       <li> <NavLink to="/">LogOut</NavLink></li>
       <li> <NavLink to="/chats" className="btn btn-floating green lighten-3">TA</NavLink></li>
    
    </ul>
   )
  }
export default LoggedIn;


// import PropTypes from 'prop-types';