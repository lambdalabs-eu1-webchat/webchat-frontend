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

import TeamMembersList from '../components/TeamMembersList';
import TeamMembersAddNewMemberModal from '../components/TeamMembersAddNewMemberModal';

class TeamMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
    };
    this.props = props;
    const { currentUser, dispatchFetchHotelStaff } = this.props;
    dispatchFetchHotelStaff(currentUser.hotel_id);
  }

  componentDidMount() {
    this.props.dispatchFetchSingleHotel(this.props.currentUser.hotel_id);
  }

  handleShowModal = () => {
    this.setState({ modalShown: true });
  };

  handleHideModal = () => {
    this.setState({ modalShown: false });
  };

  render() {
    const {
      users,
      currentUser,
      dispatchCreateUser,
      dispatchChangeUserType,
      dispatchDeleteUser,
    } = this.props;
    return (
      <div className='team-members'>
        <h2>Team Members Page</h2>
        <h3>Update and Assign Team Members</h3>
        <TeamMembersList
          users={users}
          currentUser={currentUser}
          changeUserType={dispatchChangeUserType}
          deleteUser={dispatchDeleteUser}
          loading={this.props.loading}
        />
        <TeamMembersAddNewMemberModal
          createUser={dispatchCreateUser}
          handleHideModal={this.handleHideModal}
          modalShown={this.state.modalShown}
          plan={this.props.hotel.plan}
          staffAmount={users.length}
          loading={this.props.loading}
        />
        <button onClick={this.handleShowModal}>Add Team Members</button>
      </div>
    );
  }
}

TeamMembers.propTypes = {
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  hotel: PropTypes.object.isRequired,
  dispatchChangeUserType: PropTypes.func.isRequired,
  dispatchDeleteUser: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    users: state.users,
    currentUser: state.currentUser,
    hotel: state.hotel,
    loading: state.loading,
  };
};

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
