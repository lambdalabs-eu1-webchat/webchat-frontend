import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from './node_modules/prop-types';
// import { Redirect } from 'react-router-dom';

const LoggedOut = () => {
  return (
    <ul className="right">
       <li> <NavLink to="/">Dashboard</NavLink></li>
       <li> <NavLink to="/">LogOut</NavLink></li>
       <li> <NavLink to="/chats" className="btn btn-floating green lighten-3">TA</NavLink></li>
    
    </ul>
   )
  }
export default LoggedOut;








// //  const LoggedOut = () => {
// // return(

// // )
// //  }
// // // const Logout = ({ logout }) => {
// // //   localStorage.clear();
// // //   logout();
// // //   return <Redirect to="/" />;
// // // };

// // // Logout.propTypes = {
// // //   logout: PropTypes.func.isRequired,
// // // };

// export default Logout;
