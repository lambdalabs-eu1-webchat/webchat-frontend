import React from "react";
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllUsers } from './store/actions/users';
import { loginRequest, registerUser, logout } from './store/actions/auth';

import NavBar from './components/NavBar';
import Login from './views/Login';
import Register from './views/Register';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillMount() {
    const {dispatchFetchAllUsers} = this.props;
    dispatchFetchAllUsers();
  }

  render() {
    const { state, dispatchLoginRequest, dispatchRegisterUser, dispatchFetchAllUsers, dispatchLogout } = this.props;
    return (
      <div className='App'>
        <h1>Hello, World!</h1>
        {state.users.map(user => (
            <p key={user._id}> {user.name} </p>
        ))}
      </div>
    );
  };
}

App.propTypes = {
  state: PropTypes.shape().isRequired,
  dispatchRegisterUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ state });

export default withRouter(connect(mapStateToProps, {
  dispatchRegisterUser: registerUser,
  dispatchFetchAllUsers: fetchAllUsers,
})(App));

