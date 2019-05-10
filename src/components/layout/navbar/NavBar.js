import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import { NavLink } from 'react-router-dom';
import LoggedIn from './SignedInLink';
import LoggedOut from './SignedOutLink';
import { connect } from 'react-redux';

const NavBar = props => {
  return (
    <StyledNav className="nav-wrapper navy darken-2">
      <div className="container">
        <NavLink to="/" className="brand-logo">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />{' '}
          </header>
          <div>
            {props.numberActiveTickets ? (
              <p className="tickets">
                Active tickets: {props.numberActiveTickets}
              </p>
            ) : null}
            {props.numberQueuedTickets ? (
              <p className="tickets">
                Queued tickets: {props.numberQueuedTickets}
              </p>
            ) : null}
          </div>
        </NavLink>
        {props.currentUser.name ? (
          <LoggedIn userType={props.currentUser.user_type} />
        ) : (
          <LoggedOut />
        )}
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  .tickets {
    color: #0b9fec;
  }
  .active {
    color: white;
  }
`;

function mapStateToProps(state) {
  return {
    numberActiveTickets: state.chats.activeChats.length,
    numberQueuedTickets: state.chats.queuedChats.length,
  };
}

export default connect(mapStateToProps)(NavBar);
