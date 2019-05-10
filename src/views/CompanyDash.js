import React from 'react';
import SuperAdminNav from '../components/SuperAdminNav';
import { Route } from 'react-router-dom';
import Billing from '../views/Billing';
import TeamMembers from '../views/TeamMembers';
import CompanySettings from '../views/CompanySettings';
import { APP_PATHS } from '../utils/paths';
function CompanyDash() {
  return (
    <div>
      <SuperAdminNav />

      <Route
        path={`${APP_PATHS.COMPANY_DASH}${APP_PATHS.BILLING}`}
        component={Billing}
      />
      <Route
        path={`${APP_PATHS.COMPANY_DASH}${APP_PATHS.TEAM_MEMBERS}`}
        component={TeamMembers}
      />
      <Route
        path={`${APP_PATHS.COMPANY_DASH}${APP_PATHS.COMPANY_SETTINGS}`}
        component={CompanySettings}
      />
    </div>
  );
}
export default CompanyDash;
