import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from './../theme/styledTheme';

import { APP_PATHS } from '../utils/paths';

const SuperAdminNav = ({ numberRooms }) => {
  if (numberRooms === 0) {
    return null;
  }
  return (
    <SuperAdminNavWrapper>
      <NavLink to={`${APP_PATHS.COMPANY_DASH}${APP_PATHS.TEAM_MEMBERS}`}>
        Team Members
      </NavLink>
      <NavLink to={`${APP_PATHS.COMPANY_DASH}${APP_PATHS.BILLING}`}>
        Billing
      </NavLink>
      <NavLink to={`${APP_PATHS.COMPANY_DASH}${APP_PATHS.COMPANY_SETTINGS}`}>
        Company Settings
      </NavLink>
    </SuperAdminNavWrapper>
  );
};

function mapStateToProps(state) {
  return {
    numberRooms: state.rooms.rooms.length,
  };
}

export default connect(mapStateToProps)(SuperAdminNav);

const SuperAdminNavWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5rem;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
  a {
    text-decoration: none;
    color: ${theme.color.accentPurple};
    text-transform: uppercase;
    padding: 1rem 0;
    width: 15rem;
    font-weight: bold;
    text-align: center;
    border-radius: 5px 5px 0 0;
    background: ${theme.color.lightPurple};
    margin-right: 0.5rem;
    font-size: ${theme.fontSize.xxs};
    &.active {
    color: ${theme.color.accentPurple};
      border-bottom: 2px solid ${theme.color.accentGreen};
      font-weight: bold;
    }
    @media(max-width: 600px) {
      width: 100%;
      background: ${theme.color.lightPurple};
      margin-bottom: 1rem;
      &.active {
        border-bottom: 2px solid ${theme.color.accentGreen};
      }
    }
  }
`;
