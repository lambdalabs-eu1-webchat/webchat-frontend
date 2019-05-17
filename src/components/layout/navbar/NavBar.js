import React from 'react';
import styled from 'styled-components';
// import logo from './logo.svg';
import logo from './logo2.svg';
import { NavLink } from 'react-router-dom';
import LoggedIn from './SignedInLink';
import LoggedOut from './SignedOutLink';
import { connect } from 'react-redux';
import theme from '../../../theme/styledTheme';
import { SUPER_ADMIN } from '../../../utils/userTypes';

const NavBar = props => {
  if (props.numberRooms === 0 && props.currentUser.user_type === SUPER_ADMIN) {
    return (
      <StyledNav className="nav-wrapper navy darken-2 hide-on-print">
        <div className="container">
          <NavLink to="/" className="brand-logo">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />{' '}
            </header>
          </NavLink>
          <NavLink to="/logout">Logout </NavLink>
        </div>
      </StyledNav>
    );
  }
  return (
    <StyledNav className="nav-wrapper navy darken-2 hide-on-print">
      <div className="container">
        <NavLink to="/" className="brand-logo">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />{' '}
          </header>
        </NavLink>
        {props.currentUser.name ? ( // if a user is logged in
          <React.Fragment>
            <div className="tickets-nav">
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
          <LoggedOut />
        )}
      </div>
    </StyledNav>
  );
};

function mapStateToProps(state) {
  return {
    numberActiveTickets: state.chats.activeChats.length,
    numberQueuedTickets: state.chats.queuedChats.length,
    numberRooms: state.rooms.rooms.length,
  };
}

export default connect(mapStateToProps)(NavBar);

const StyledNav = styled.nav`
  background: ${theme.color.secondaryPurple};
  padding: 1rem 2.5rem;
  text-transform: uppercase;
  a {
    text-decoration: none;
    font-size: ${theme.fontSize.xs};
    color: ${theme.color.white};
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    img {
      border-radius: 0;
      width: 60%;
    }
  }
  .tickets-nav {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right: 6%;
    @media (max-width: 1000px) {
      right: 10%;
    }
    @media (max-width: 600px) {
      right: 15%;
      flex-direction: column;
      text-align: right;
    }
      @media (max-width: 450px) {
      right: 17%;
      flex-direction: column;
      text-align: right;
    }
  }
  
  .tickets {
    color: ${theme.color.lightPurple};
    font-weight: bold;
    font-size: ${theme.fontSize.xxs};
    &:first-child {
      margin-right: 1.3rem;
      @media (max-width: 600px) {
        margin: 0;
      }
    }
  }
  
  .active {
    color: ${theme.color.white};
  }
  .brand-logo {
    z-index: 5;
  }
`;
