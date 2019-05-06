import React from 'react';
import { connect } from "react-redux";
import { fetchAllUsers, fetchHotelStaff, createUser } from "../store/actions/users";

import SuperAdminNav from '../components/SuperAdminNav';
import TeamMembersList from '../components/TeamMembersList';
import TeamMembersAddNewMemberModal from "../components/TeamMembersAddNewMemberModal";

class TeamMembers extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const { state, dispatchFetchHotelStaff } = this.props;
    dispatchFetchHotelStaff(state.currentUser.hotel_id);
  }

  render() {
    const { state, dispatchCreateUser } = this.props;
    return (
        <div className="team-members">
          <SuperAdminNav/>
          <h2>Team Members Page</h2>
          <h3>Update and Assign Team Members</h3>
          <TeamMembersList users={state.users} currentUser={state.currentUser}/>
          <TeamMembersAddNewMemberModal createUser={dispatchCreateUser}/>
          <button onClick={(e) => console.log('open modal')}>Add Team Members</button>
        </div>
    );
  };
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps, {
  dispatchFetchAllUsers: fetchAllUsers,
  dispatchFetchHotelStaff: fetchHotelStaff,
  dispatchCreateUser: createUser,
})(TeamMembers);
