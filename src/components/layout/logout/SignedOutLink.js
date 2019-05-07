import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from './node_modules/prop-types';
// import { Redirect } from 'react-router-dom';

const LoggedOut = () => {
  return (
    <ul className="right">
       <li> <NavLink to="/register">Register</NavLink></li>
       <li> <NavLink to="/login">Login</NavLink></li> 
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
