import React from 'react';
import styled from 'styled-components';
import theme from './.././theme/styledTheme';
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
        <CheckInWrapper className="sub-container">
          <h1 className="hide-on-print">Check-in</h1>
          <CheckInForm
            availableRooms={this.state.availableRooms}
            filterAvailableRoom={this.filterAvailableRoom}
            addCurrentGuest={this.addCurrentGuest}
            hotel_id={this.props.hotel_id}
            loading={this.props.loading}
          />
        </CheckInWrapper>
        <CheckOutWrapper className="hide-on-print sub-container">
          <h1>Check-out</h1>
          <CheckOutForm
            hotel_id={this.props.hotel_id}
            currentGuests={this.state.currentGuests}
            filterCurrentGuests={this.filterCurrentGuests}
            addAvailableRoom={this.addAvailableRoom}
            loading={this.props.loading}
            socket={this.props.socket}
          />
        </CheckOutWrapper>
      </StyledCheckInOrOut>
    );
  }
}

CheckInOrOut.propTypes = {
  hotel_id: propTypes.string.isRequired,
  loading: propTypes.object.isRequired,
};

const StyledCheckInOrOut = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 8rem auto;

  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
    margin: 5rem auto;
    padding: 0 3rem;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }

  h1 {
    padding: 10% 0;
    font-size: ${theme.fontSize.l};
  }
`;

const CheckInWrapper = styled.div`
  width: 80%;
  margin-right: 3rem;
  @media (max-width: 1000px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const CheckOutWrapper = styled.div`
  width: 80%;
  margin-left: 3rem;
  @media(max-width:1000px) {
    margin: 0 auto;
    width: 100%;
`;

function mapStateToProps(state) {
  return {
    hotel_id: state.currentUser.hotel_id,
    loading: state.loading,
    socket: state.chats.socket,
  };
}

export default connect(mapStateToProps)(CheckInOrOut);
