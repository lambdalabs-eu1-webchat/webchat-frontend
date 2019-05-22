import React from 'react';
import propTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from './Logout';
import HomePage from '../views/HomePage';
import TermsPage from '../views/TermsPage';
import PrivacyPage from '../views/PrivacyPage';
import Chat from '../views/Chat';
import Login from '../views/Login';
import Register from '../views/Register';
import TeamMembers from '../views/TeamMembers';
import CheckInOrOut from '../views/CheckInOrOut';
import EmployeeSettings from '../views/EmployeeSettings';
import CompanyDash from '../views/CompanyDash';
import { APP_PATHS } from '../utils/paths';
import { Redirect } from 'react-router-dom';
import { fetchRooms } from '../store/actions/rooms';

// temp fix
const style404 = {
  minHeight: 'calc(100vh - 236px)'
};

function Router({
  user_type,
  fetchRooms,
  hotelHasZeroRooms,
  currentUser,
  gotRooms
}) {
  if (!user_type) {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path={APP_PATHS.LOGIN} component={Login} />
        <Route exact path={APP_PATHS.REGISTER} component={Register} />
        <Route exact path={APP_PATHS.TERMS} component={TermsPage} />
        <Route exact path={APP_PATHS.PRIVACY} component={PrivacyPage} />
        <Route render={() => <div style={style404}>404 not found</div>} />
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
        <Route exact path={APP_PATHS.CHECK_IN_OUT} component={CheckInOrOut} />
        <Route render={() => <Redirect to={APP_PATHS.CHAT} />} />
      </Switch>
    );
  } else if (user_type === 'super admin') {
    // if havent gotten rooms yet get them
    if (!gotRooms) {
      fetchRooms(currentUser.hotel_id);
    }

    if (hotelHasZeroRooms) {
      // if no rooms make only route a route to make rooms
      return (
        <Switch>
          <Route
            path={APP_PATHS.COMPANY_DASH + APP_PATHS.COMPANY_SETTINGS}
            component={CompanyDash}
          />
          <Route exact path={APP_PATHS.LOGIN} component={Login} />
          <Route exact path={APP_PATHS.REGISTER} component={Register} />
          <Route exact path={APP_PATHS.LOGOUT} component={Logout} />
          <Route
            render={() => (
              <Redirect
                to={APP_PATHS.COMPANY_DASH + APP_PATHS.COMPANY_SETTINGS}
              />
            )}
          />
        </Switch>
      );
      // redirect to that route
    }

    return (
      <Switch>
        <Route exact path={APP_PATHS.LOGIN} component={Login} />
        <Route exact path={APP_PATHS.REGISTER} component={Register} />
        <Route exact path={APP_PATHS.LOGOUT} component={Logout} />
        <Route path={APP_PATHS.COMPANY_DASH} component={CompanyDash} />
        <Route exact path={APP_PATHS.CHAT} component={Chat} />
        <Route
          exact
          path={APP_PATHS.ACCOUNT_SETTINGS}
          component={EmployeeSettings}
        />
        <Route exact path={APP_PATHS.CHECK_IN_OUT} component={CheckInOrOut} />
        ;
        <Route
          render={() => (
            <Redirect
              to={APP_PATHS.COMPANY_DASH + APP_PATHS.COMPANY_SETTINGS}
            />
          )}
        />
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
        <Route render={() => <Redirect to={APP_PATHS.CHAT} />} />
      </Switch>
    );
  }
}

Router.propTypes = {
  user_type: propTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    hotelHasZeroRooms: state.rooms.hotelHasZeroRooms,
    gotRooms: state.rooms.initGotRooms,
    currentUser: state.currentUser
  };
}

export default connect(
  mapStateToProps,
  { fetchRooms }
)(Router);
