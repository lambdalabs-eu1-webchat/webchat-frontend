import React from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN,SUPER_ADMIN, RECEPTIONIST  } from '../../../utils/userTypes'



const LoggedIn = ({userType}) => {
  return (
    <ul className="">
       <li> <NavLink to="/chat">Chat Dash</NavLink></li>
       {userType === ADMIN ? <li><NavLink>Team Members</NavLink></li>: null}
       {userType === SUPER_ADMIN ? <li><NavLink>Company Dash</NavLink></li>: null}
       {userType === RECEPTIONIST ? <li><NavLink>some</NavLink></li>: null}
      
       <li> <NavLink to="/checkin"  >Check In</NavLink></li>
       <li> <NavLink to="/logout"  >LogOut</NavLink></li>

       {/* this will be linked to the Employee settings as an icon with their Initials or img */}
       <li> <NavLink to="/" className="btn btn-floating green lighten-1">TA / Employee Settings</NavLink></li>
    </ul>

   )
  }
export default LoggedIn;


// import PropTypes from 'prop-types';