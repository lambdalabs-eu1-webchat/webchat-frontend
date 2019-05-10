import React from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN, SUPER_ADMIN } from '../../../utils/userTypes';

import { APP_PATHS } from '../../../utils/paths';

const LoggedIn = ({ userType }) => {
  return (
    <ul className=''>
      <li>
        {' '}
        <NavLink to={APP_PATHS.CHAT}>Chat Dash</NavLink>
      </li>
      {userType === ADMIN ? (
        <li>
          <NavLink to={APP_PATHS.TEAM_MEMBERS}>Team Members</NavLink>
        </li>
      ) : null}
      {userType === SUPER_ADMIN ? (
        <li>
          <NavLink to={APP_PATHS.COMPANY_DASH + APP_PATHS.COMPANY_SETTINGS}>
            Company Dash
          </NavLink>
        </li>
      ) : null}
      <li>
        {' '}
        <NavLink to={APP_PATHS.CHECK_IN_OUT}>Check In</NavLink>
      </li>
      <li>
        {' '}
        <NavLink to={APP_PATHS.LOGOUT}>LogOut</NavLink>
      </li>

      {/* this will be linked to the Employee settings as an icon with their Initials or img */}
      <li>
        {' '}
        <NavLink
          to={APP_PATHS.ACCOUNT_SETTINGS}
          className='btn btn-floating green lighten-1'
        >
          Account settings
        </NavLink>
      </li>
    </ul>
  );
};
export default LoggedIn;

// import PropTypes from 'prop-types';
