import React from 'react';
import { NavLink } from 'react-router-dom';
import { APP_PATHS } from '../utils/paths';

const SuperAdminNav = () => {
  return (
    <div className='super-admin-nav'>
      <NavLink to={`${APP_PATHS.COMPANY_DASH}${APP_PATHS.TEAM_MEMBERS}`}>
        Team Members
      </NavLink>
      <NavLink to={`${APP_PATHS.COMPANY_DASH}${APP_PATHS.BILLING}`}>
        Billing
      </NavLink>
      <NavLink to={`${APP_PATHS.COMPANY_DASH}${APP_PATHS.COMPANY_SETTINGS}`}>
        Company Settings
      </NavLink>
    </div>
  );
};

export default SuperAdminNav;
