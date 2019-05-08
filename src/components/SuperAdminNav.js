import React from 'react';
import { NavLink } from 'react-router-dom';

const SuperAdminNav = () => {
  return (
      <div className="super-admin-nav">
        <NavLink to="/team-members">Team Members</NavLink>
        <NavLink to="/billing">Billing</NavLink>
        <NavLink to="/company-settings">Company Settings</NavLink>

      </div>
  )
};

export default SuperAdminNav;
