import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN, SUPER_ADMIN } from '../../../utils/userTypes';
import styled from 'styled-components';
import theme from '../../../theme/styledTheme';

import { APP_PATHS } from '../../../utils/paths';

const LoggedIn = ({ userType }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  function toggleIsNavOpen() {
    setIsNavOpen(!isNavOpen);
  }
  function closeNav() {
    setIsNavOpen(false);
  }
  return (
    <MenuToggle id="menuToggle">
      <input onClick={toggleIsNavOpen} checked={isNavOpen} type="checkbox" readOnly />
      <span />
      <span />
      <span />
      <ul className="menu">
        <li>
          <NavLink onClick={closeNav} to={APP_PATHS.CHAT}>
            Chat Dash
          </NavLink>
        </li>
        {userType === ADMIN ? (
          <li>
            <NavLink onClick={closeNav} to={APP_PATHS.TEAM_MEMBERS}>
              Team Members
            </NavLink>
          </li>
        ) : null}
        {userType === SUPER_ADMIN ? (
          <li>
            <NavLink onClick={closeNav} to={APP_PATHS.COMPANY_DASH}>
              Company Dash
            </NavLink>
          </li>
        ) : null}
        <li>
          <NavLink onClick={closeNav} to={APP_PATHS.CHECK_IN_OUT}>
            Check In
          </NavLink>
        </li>
        {/* this will be linked to the Employee settings as an icon with their Initials or img */}
        <li>
          <NavLink
            onClick={closeNav}
            to={APP_PATHS.ACCOUNT_SETTINGS}
            className="btn btn-floating green lighten-1"
          >
            Account settings
          </NavLink>
        </li>
        <li>
          <NavLink onClick={closeNav} to={APP_PATHS.LOGOUT}>
            LogOut
          </NavLink>
        </li>
      </ul>
    </MenuToggle>
  );
};
export default LoggedIn;

// import PropTypes from 'prop-types';
const MenuToggle = styled.div`
  display: block;
  position: relative;
  align-self: center;
  z-index: 1;
  input {
    margin: 0;
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
    &:checked ~ span {
      opacity: 1;
      transform: rotate(45deg) translate(-2px, -1px);
      background: ${theme.color.footerText};
    }
    &:checked ~ span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }
    &:checked ~ span:nth-last-child(2) {
      transform: rotate(-45deg) translate(0, -1px);
    }
    &:checked ~ ul {
      transform: none;
    }
  }
  span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: ${theme.color.footerText};
    border-radius: 2px;
    z-index: 1;
    transform-origin: 4px 0;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
    &:first-child {
      transform-origin: 0 0;
    }
    &:nth-last-child(2) {
      transform-origin: 0 100%;
    }
  }

  .menu {
    border-radius: 0 0 0 5px;
    position: absolute;
    width: 250px;
    margin: -100px 0 100px -192px;
    padding: 125px 50px 50px 50px;
    background: ${theme.color.secondaryPurple};
    list-style-type: none;
    transform-origin: 0 0;
    transform: translate(0, -100%);
    transition: transform 0.8s cubic-bezier(0.77, 0.2, 0.05, 1);
    @media (max-width: 600px) {
      position: fixed;
      width: 100vw;
      margin: 0;
      top: 0;
      left: 0;
      padding-top: 50px;
      transform-origin: 0 0;
      transform: translate(0, -100%);
    }
    li {
      padding: 10px 0;
      font-size: ${theme.fontSize.xs};
      .active {
        color: ${theme.color.accentGreen};
      }
    }

    a {
      color: ${theme.color.white};
      transition: 0.3s ease;
      padding: 0;
      &:hover {
        color: ${theme.color.accentGreen};
      }
    }
  }
`;
