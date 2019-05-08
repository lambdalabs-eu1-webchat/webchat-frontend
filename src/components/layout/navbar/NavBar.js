import React from 'react';
import { NavLink } from 'react-router-dom';
import LoggedIn from './SignedInLink'
import LoggedOut from './SignedOutLink'



const NavBar = () => {
  return(
    <nav className="nav-wrapper navy darken-2">
       <div className="container">
       <NavLink to="/" className="brand-logo">frontdesk</NavLink>
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
