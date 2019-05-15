import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../theme/styledTheme';

const LoggedOut = () => {
  return (
    <LoggedOutList className="right">
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        {' '}
        <NavLink to="/login">Login</NavLink>
      </li>
    </LoggedOutList >
  );
};
export default LoggedOut;

const LoggedOutList = styled.ul`
  display: flex;
  align-items: center;
  a {
    font-size: ${theme.fontSize.xs};
    color: ${theme.color.white};
    padding-left: 20px;
  }
`;

