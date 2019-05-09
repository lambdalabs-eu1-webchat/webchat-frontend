import React from 'react';
import logo from './logo.svg';
import { NavLink } from 'react-router-dom';
import LoggedIn from './SignedInLink'
import LoggedOut from './SignedOutLink'
import { connect } from 'react-redux'

const NavBar = (props) => {

  return(
    <nav className="nav-wrapper navy darken-2">
       <div className="container">
       <NavLink to="/" className="brand-logo">
       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> </header>
       </NavLink>
      { props.currentUser.name ? <LoggedIn userType={props.currentUser.user_type} /> : <LoggedOut  />}

       </div>
    </nav>
  )
}

// NavBar.propTypes = {
//   loggedIn: PropTypes.bool.isRequired,
// };
const mapStateToProps = (state) => {
  return{
    // auth: state.mongodb.auth
  }
}

export default NavBar;
