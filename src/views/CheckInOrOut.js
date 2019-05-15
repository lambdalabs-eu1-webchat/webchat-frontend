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
  };
  componentDidMount() {
    axios
      .get(`${DOMAIN}${HOTEL}/${this.props.hotel_id}/rooms/available`)
      .then(res => {
        this.setState({ availableRooms: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  filterAvaliableRoom = room_id => {
    this.setState(cState => {
      const availableRooms = cState.availableRooms.filter(
        room => room._id !== room_id,
      );
      return { availableRooms };
    });
  };
  render() {
    return (
      <StyledCheckInOrOut>
        <div>
          <h1>Check-in</h1>
          <CheckInForm
            availableRooms={this.state.availableRooms}
            filterAvaliableRoom={this.filterAvaliableRoom}
            hotel_id={this.props.hotel_id}
          />
        </div>
        <div>
          <h1>Check-out</h1>
          <CheckOutForm hotel_id={this.props.hotel_id} />
        </div>
      </StyledCheckInOrOut>
    );
  }
}

CheckInOrOut.propTypes = {
  hotel_id: propTypes.string.isRequired,
};

const StyledCheckInOrOut = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  margin: auto;
  @media (max-width: 1200px) {
    margin-top: 4%;
  }
  h1 {
    padding: 10% 0;
    font-size: 1.5rem;
  }
  div {
    width: 95%;
  }
`;

function mapStateToProps(state) {
  return {
    hotel_id: state.currentUser.hotel_id,
  };
}

export default connect(mapStateToProps)(CheckInOrOut);
