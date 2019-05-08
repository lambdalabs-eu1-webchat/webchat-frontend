import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRooms } from '../store/actions/rooms';
import CheckInForm from '../components/CheckInForm';
import CheckOutForm from '../components/CheckOutForm';

class CheckInOrOut extends React.Component {
  componentDidMount() {
    // get the rooms
    this.props.fetchRooms(this.props.hotel_id);
    console.log(this.props.hotel_id);
  }
  render() {
    return (
      <StyledCheckInOrOut>
        <div>
          check in
          <CheckInForm rooms={this.props.rooms} />
        </div>
        <div>
          checkout <CheckOutForm rooms={this.props.rooms} />
        </div>
      </StyledCheckInOrOut>
    );
  }
}

CheckInOrOut.propTypes = {};

const StyledCheckInOrOut = styled.div`
  display: flex;
  justify-content: space-around;
`;

function mstp(state) {
  return {
    rooms: state.rooms.rooms,
    fetchingRooms: state.rooms.fetching,
    roomsError: state.rooms.error,
    hotel_id: state.currentUser.hotel_id,
  };
}

export default connect(
  mstp,
  { fetchRooms },
)(CheckInOrOut);
