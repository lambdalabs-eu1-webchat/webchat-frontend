import React from "react";
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllUsers } from './store/actions/users';

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
    const { state } = this.props;
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

App.propTypesypes = {
  state: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({ state });

export default (connect(mapStateToProps, {
  dispatchFetchAllUsers: fetchAllUsers,
})(App));

