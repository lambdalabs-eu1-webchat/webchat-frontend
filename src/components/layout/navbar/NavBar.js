import React from 'react';
import logo from './logo.svg';
import { NavLink } from 'react-router-dom';
import LoggedIn from './SignedInLink'
import LoggedOut from './SignedOutLink'
import { connect } from 'react-redux'

const NavBar = (props) => {
  const { auth } = props;
 
  return(
    <nav className="nav-wrapper navy darken-2">
       <div className="container">
       <NavLink to="/" className="brand-logo">
       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> </header>
       </NavLink>
      { props.currentUser ? <LoggedIn usertype={props.currentUser.user_type} /> : <LoggedOut  />}

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
const mapStateToProps = (state) => {
  return{
    // auth: state.mongodb.auth
  }
}

export default connect(mapStateToProps)(NavBar);
