import React from 'react';
import propTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Logout from './Logout';
import HomePage from '../views/HomePage';
import Chat from '../views/Chat';
import Login from '../views/Login';
import Register from '../views/Register';
import Billing from '../views/Billing';
import TeamMembers from '../views/TeamMembers';
import CheckInOrOut from '../views/CheckInOrOut';
import EmployeeSettings from '../views/EmployeeSettings';
import CompanyDash from '../views/CompanyDash';
import { APP_PATHS } from '../utils/paths';

function Router({ user_type }) {
  if (!user_type) {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path={APP_PATHS.LOGIN} component={Login} />
        <Route exact path={APP_PATHS.REGISTER} component={Register} />
        <Route render={() => <div>404 not found</div>} />
      </Switch>
    );
  } else if (user_type === 'admin') {
    return (
      <Switch>
        <Route exact path={APP_PATHS.LOGIN} component={Login} />
        <Route exact path={APP_PATHS.REGISTER} component={Register} />
        <Route exact path={APP_PATHS.LOGOUT} component={Logout} />
        <Route exact path={APP_PATHS.TEAM_MEMBERS} component={TeamMembers} />
        <Route exact path={APP_PATHS.CHAT} component={Chat} />
        <Route
          exact
          path={APP_PATHS.ACCOUNT_SETTINGS}
          component={EmployeeSettings}
        />
        <Route exact path={APP_PATHS.CHECK_IN_OUT} component={CheckInOrOut} />;
        ;
        <Route render={() => <div>404 not found</div>} />
      </Switch>
    );
  } else if (user_type === 'super admin') {
    return (
      <Switch>
        <Route exact path={APP_PATHS.LOGIN} component={Login} />
        <Route exact path={APP_PATHS.REGISTER} component={Register} />
        <Route exact path={APP_PATHS.LOGOUT} component={Logout} />
        <Route path={APP_PATHS.COMPANY_DASH} component={CompanyDash} />
        >
        <Route exact path={APP_PATHS.CHAT} component={Chat} />
        <Route
          exact
          path={APP_PATHS.ACCOUNT_SETTINGS}
          component={EmployeeSettings}
        />
        <Route exact path={APP_PATHS.CHECK_IN_OUT} component={CheckInOrOut} />
        ;
        <Route render={() => <div>404 not found</div>} />
      </Switch>
    );
  } else if (user_type === 'receptionist') {
    return (
      <Switch>
        <Route exact path={APP_PATHS.LOGIN} component={Login} />
        <Route exact path={APP_PATHS.REGISTER} component={Register} />
        <Route exact path={APP_PATHS.LOGOUT} component={Logout} />
        <Route exact path={APP_PATHS.CHAT} component={Chat} />
        <Route
          exact
          path={APP_PATHS.ACCOUNT_SETTINGS}
          component={EmployeeSettings}
        />
        <Route path={APP_PATHS.CHECK_IN_OUT} component={CheckInOrOut} />;
        <Route render={() => <div>404 not found</div>} />
      </Switch>
    );
  }
}

Router.propTypes = {
  user_type: propTypes.string.isRequired,
};
export default Router;
