import React from 'react';
import { NavLink } from 'react-router-dom';
import LoggedIn from '../../layout/login/SignedInLink'
import LoggedOut from '../../layout/logout/SignedOutLink'


const NavBar = () => {
  return(
    <nav className="nav-wrapper dark-blue darken-">
       <div className="container">
       <NavLink to="/" className="brand-logo">FrontDesk</NavLink>
       <LoggedIn />
       <LoggedOut />
       </div>
    </nav>
  )
}

// import PropTypes from 'prop-types';
// const NavBar = ({ loggedIn }) => (
//     <div>
//       {!loggedIn ? (
//           <nav>
//             <Link to="/" className="left">logo</Link>
//             <LoggedIn />
//             <NavLink to="/register" className="">Register</NavLink>
//             <NavLink to="/login" className="">Login</NavLink>

//           </nav>
//       ) : (
//           <nav>
//             <NavLink to="/logout">Logout</NavLink>
//           </nav>
//       )}

//     </div>
// );

// NavBar.propTypes = {
//   loggedIn: PropTypes.bool.isRequired,
// };

export default NavBar;
