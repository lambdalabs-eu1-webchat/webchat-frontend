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
        </NavLink>
        {props.currentUser.name ? (
          props.numberRooms > 0 ? (
            <React.Fragment>
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
              <LoggedIn userType={props.currentUser.user_type} />
            </React.Fragment>
          ) : (
            <NavLink to="/logout">Logout </NavLink>
          )
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
    numberRooms: state.rooms.rooms.length,
  };
}

export default connect(mapStateToProps)(NavBar);
