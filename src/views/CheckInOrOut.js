import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { DOMAIN, USERS, HOTEL } from '../utils/paths';

import CheckInForm from '../components/GuestCheckInForm';
import CheckOutForm from '../components/GuestCheckOutForm';

class CheckInOrOut extends React.Component {
  state = {
    availableRooms: [],
    currentGuests: [],
  };
  componentDidMount() {
    axios
      .get(`${DOMAIN}${HOTEL}/${this.props.hotel_id}/rooms/available`)
      .then(res => {
        this.setState({
          availableRooms: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
    // get the hotels current guests
    axios
      .get(`${DOMAIN}${HOTEL}/${this.props.hotel_id}/guests?status=here`)
      .then(res => {
        this.setState({
          currentGuests: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  addAvailableRoom = room => {
    this.setState(cState => {
      const availableRooms = [...cState.availableRooms, room];
      return { availableRooms };
    });
  };
  filterAvailableRoom = room_id => {
    this.setState(cState => {
      // get the room
      const availableRooms = cState.availableRooms.filter(
        room => room._id !== room_id,
      );
      return { availableRooms };
    });
  };
  addCurrentGuest = guest => {
    this.setState(cState => {
      const currentGuests = [...cState.currentGuests, guest];
      return {
        currentGuests,
      };
    });
  };
  filterCurrentGuests = guest_id => {
    this.setState(cState => {
      const newCurrentGuests = cState.currentGuests.filter(
        guest => guest_id !== guest._id,
      );
      return {
        currentGuests: newCurrentGuests,
      };
    });
  };
  render() {
    return (
      <StyledCheckInOrOut>
        <div className="sub-container">
          <h1 className="hide-on-print">Check-in</h1>
          <CheckInForm
            availableRooms={this.state.availableRooms}
            filterAvailableRoom={this.filterAvailableRoom}
            addCurrentGuest={this.addCurrentGuest}
            hotel_id={this.props.hotel_id}
            loading={this.props.loading}
          />
        </div>
        <div className="hide-on-print sub-container">
          <h1>Check-out</h1>
          <CheckOutForm
            hotel_id={this.props.hotel_id}
            currentGuests={this.state.currentGuests}
            filterCurrentGuests={this.filterCurrentGuests}
            addAvailableRoom={this.addAvailableRoom}
            loading={this.props.loading}
          />
        </div>
      </StyledCheckInOrOut>
    );
  }
}

CheckInOrOut.propTypes = {
  hotel_id: propTypes.string.isRequired,
  loading: propTypes.object.isRequired,
};

const StyledCheckInOrOut = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  margin: auto;
  @media (max-width: 1200px) {
    margin-top: 4%;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }

  h1 {
    padding: 10% 0;
    font-size: 1.5rem;
  }
  .sub-container {
    width: 95%;
    padding: 0 20px;
  }
`;

function mapStateToProps(state) {
  return {
    hotel_id: state.currentUser.hotel_id,
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(CheckInOrOut);
