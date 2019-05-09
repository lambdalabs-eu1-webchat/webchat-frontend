import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchAllUsers,
  fetchHotelStaff,
  createUser,
  changeUserType,
  deleteUser,
} from '../store/actions/users';
import { fetchSingleHotel } from '../store/actions/hotel';

import SuperAdminNav from '../components/SuperAdminNav';
import TeamMembersList from '../components/TeamMembersList';
import TeamMembersAddNewMemberModal from '../components/TeamMembersAddNewMemberModal';

class TeamMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
    };
    this.props = props;
    const {
      state,
      dispatchFetchHotelStaff,
    } = this.props;
    dispatchFetchHotelStaff(state.currentUser.hotel_id);
  }

  componentDidMount() {
    this.props.dispatchFetchSingleHotel(this.props.state.currentUser.hotel_id);
  }

  handleShowModal = () => {
    this.setState({ modalShown: true });
  };

  handleHideModal = () => {
    this.setState({ modalShown: false });
  };

  render() {
    const {
      state,
      dispatchCreateUser,
      dispatchChangeUserType,
      dispatchDeleteUser,
    } = this.props;
    return (
      <div className="team-members">
        <SuperAdminNav />
        <h2>Team Members Page</h2>
        <h3>Update and Assign Team Members</h3>
        <TeamMembersList
          users={state.users}
          currentUser={state.currentUser}
          changeUserType={dispatchChangeUserType}
          deleteUser={dispatchDeleteUser}
        />
        <TeamMembersAddNewMemberModal
          createUser={dispatchCreateUser}
          handleHideModal={this.handleHideModal}
          modalShown={this.state.modalShown}
          plan={this.props.state.hotel.plan}
          staffAmount={state.users.length}
        />
        <button onClick={this.handleShowModal}>Add Team Members</button>
      </div>
    );
  }
}

TeamMembers.propTypes = {
  state: PropTypes.shape().isRequired,
  dispatchChangeUserType: PropTypes.func.isRequired,
  dispatchDeleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ state });

export default connect(
  mapStateToProps,
  {
    dispatchFetchAllUsers: fetchAllUsers,
    dispatchFetchHotelStaff: fetchHotelStaff,
    dispatchCreateUser: createUser,
    dispatchChangeUserType: changeUserType,
    dispatchDeleteUser: deleteUser,
    dispatchFetchSingleHotel: fetchSingleHotel,
  },
)(TeamMembers);
