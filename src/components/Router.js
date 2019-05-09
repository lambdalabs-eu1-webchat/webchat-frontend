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

function Router({ user_type }) {
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
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/team-members' component={TeamMembers} />
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
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/team-members' component={TeamMembers} />
        <Route exact path='/billing' component={Billing} />
        <Route exact path='/chat' component={Chat} />
        <Route
          path='/account-settings'
          render={() => <div>account settings</div>}
        />
        <Route render={() => <div>404 not found</div>} />
      </Switch>
    );
  } else if (user_type === 'receptionist') {
    return (
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/chat' component={Chat} />
        <Route
          path='/account-settings'
          render={() => <div>account settings</div>}
        />
        <Route render={() => <div>404 not found</div>} />
      </Switch>
    );
  }
}

Router.propTypes = {
  user_type: propTypes.string.isRequired,
};
export default Router;
