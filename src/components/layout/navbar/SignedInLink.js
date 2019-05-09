import React from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN,SUPER_ADMIN, RECEPTIONIST  } from '../../../utils/userTypes'



const LoggedIn = ({userType}) => {
  console.log(userType)
  return (
    <ul className="right">
       <li> <NavLink to="/chat">Dashboard</NavLink></li>
       {userType === ADMIN ? <li><NavLink>Employees</NavLink></li>: null}
       {userType === SUPER_ADMIN ? <li><NavLink>Company Settings</NavLink></li>: null}
       {userType === RECEPTIONIST ? <li><NavLink>Dashboard</NavLink></li>: null}
       <li> <NavLink to="/logout"  >LogOut</NavLink></li>
       <li> <NavLink to="/" className="btn btn-floating green lighten-1">TA</NavLink></li>
    </ul>

   )
  }
export default LoggedIn;


// import PropTypes from 'prop-types';