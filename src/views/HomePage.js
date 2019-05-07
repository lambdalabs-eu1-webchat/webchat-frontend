import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../store/actions/users';
import Billing from './Billing';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const {dispatchFetchAllUsers} = this.props;
    dispatchFetchAllUsers();
  };
  render() {
    const { state } = this.props;
    return (
      <div className="home-page">
        <h2>Users</h2>
        {state.users.map(user => (
            <p key={user._id}> {user.name} </p>
        ))}
        <Billing />
      </div>
    );
  };
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps, {
  dispatchFetchAllUsers: fetchAllUsers,
})(HomePage);
