import React from "react";
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllUsers } from './store/actions/users';
import { loginRequest, registerUser, logout } from './store/actions/auth';

import NavBar from './components/NavBar';
import Logout from './components/Logout';
import HomePage from './views/HomePage';
import Chat from './views/Chat';
import Login from './views/Login';
import Register from './views/Register';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { state, dispatchLoginRequest, dispatchRegisterUser, dispatchFetchAllUsers, dispatchLogout } = this.props;
    return (
      <div className="App">
        <NavBar loggedIn={Boolean(state.authToken)} />
        <Route
          exact
          path="/"
          render={props => (
            <HomePage
              {...props}
              loggedIn={Boolean(state.authToken)}
              fetchAllUsers={dispatchFetchAllUsers}
            />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <Login
              {...props}
              loggedIn={Boolean(state.authToken)}
              loginRequest={dispatchLoginRequest}
            />
          )}
        />
        <Route
          path="/register"
          render={props => (
            <Register
              {...props}
              loggedIn={Boolean(state.authToken)}
              registerUser={dispatchRegisterUser}
            />
          )}
        />
        <Route
          exact
          path="/chat"
          render={props => (
            <Chat
              {...props}
              loggedIn={Boolean(state.authToken)}
            />
          )}
        />

        <Route
          path="/logout"
          render={props => (
            <Logout
              {...props}
              loggedIn={Boolean(state.authToken)}
              logout={dispatchLogout}
            />
          )}
        />
      </div>
    );
  };
}

App.propTypes = {
  state: PropTypes.shape().isRequired,
  dispatchLoginRequest: PropTypes.func.isRequired,
  dispatchRegisterUser: PropTypes.func.isRequired,
  dispatchLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ state });

export default withRouter(connect(mapStateToProps, {
  dispatchLoginRequest: loginRequest,
  dispatchRegisterUser: registerUser,
  dispatchFetchAllUsers: fetchAllUsers,
  dispatchLogout: logout,
})(App));

