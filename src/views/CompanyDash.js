import React from 'react';
import SuperAdminNav from '../components/SuperAdminNav';
import { Route, Switch } from 'react-router-dom';
import Billing from '../views/Billing';
import TeamMembers from '../views/TeamMembers';
import CompanySettings from '../views/CompanySettings';
import { APP_PATHS } from '../utils/paths';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

function CompanyDash() {
  return (
    <CompanyDashWrapper>
      <SuperAdminNav />
      <Switch>
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
        <Route
          path={`${APP_PATHS.COMPANY_DASH}`}
          render={() => (
            <Redirect
              to={APP_PATHS.COMPANY_DASH + APP_PATHS.COMPANY_SETTINGS}
            />
          )}
        />
      </Switch>
    </CompanyDashWrapper>
  );
}
export default CompanyDash;

const CompanyDashWrapper = styled.div`
  margin: 0 5rem;
  @media (max-width: 800px) {
    margin: 0 3rem;
  }
`;
