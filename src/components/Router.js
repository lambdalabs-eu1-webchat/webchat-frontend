import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';

import Logout from './Logout';
import HomePage from '../views/HomePage';
import Chat from '../views/Chat';
import Login from '../views/Login';
import Register from '../views/Register';
import Billing from '../views/Billing';
import TeamMembers from '../views/TeamMembers';

function Router({ user_type }) {
  debugger;
  if (!user_type) {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route render={() => <div>404 not found</div>} />
      </Switch>
    );
  } else if (user_type === 'admin') {
    return (
      <Switch>
        <Route path='/logout' component={Logout} />
        <Route path='/team-members' component={TeamMembers} />
        <Route exact path='/chat' component={Chat} />
        <Route
          path='/account-settings'
          render={() => <div>account settings</div>}
        />
        <Route render={() => <div>404 not found</div>} />
      </Switch>
    );
  } else if (user_type === 'super admin') {
    return (
      <Switch>
        <Route path='/logout' component={Logout} />
        <Route path='/team-members' component={TeamMembers} />
        <Route path='/billing' component={Billing} />
        <Route exact path='/chat' component={Chat} />
        <Route
          path='/account-settings'
          render={() => <div>account settings</div>}
        />
      </Switch>
    );
  } else if (user_type === 'receptionist') {
    return (
      <Switch>
        <Route path='/logout' component={Logout} />
        <Route exact path='/chat' component={Chat} />
        <Route
          path='/account-settings'
          render={() => <div>account settings</div>}
        />
      </Switch>
    );
  }
}

export default Router;
