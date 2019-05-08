import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';

import { DOMAIN, USERS, HOTEL } from '../utils/paths';

class CheckInForm extends React.Component {
  state = {
    nameInput: '',
    loginCode: '',
    currentRoom: null,
    availableRooms: [],
  };
  componentDidMount() {
    axios
      .get(`${DOMAIN}${HOTEL}/${this.props.hotel_id}/rooms/available`)
      .then(res => {
        console.log(res.data);
        this.setState({ availableRooms: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  setNameInput = nameInput => {
    this.setState({ nameInput });
  };
  setCurrentRoom = event => {
    const room = this.state.availableRooms.find(
      room => room._id === event.target.value,
    );
    this.setState({ currentRoom: room });
  };

  checkInGuest = async () => {
    try {
      const res = await axios.post(`${DOMAIN}${USERS}`, {
        hotel_id: this.props.hotel_id,
        user_type: 'guest',
        name: this.state.nameInput,
        room: {
          name: this.state.currentRoom.name,
          id: this.state.currentRoom._id,
        },
      });
      this.setState(cState => {
        const availableRooms = cState.availableRooms.filter(
          room => room._id !== cState.currentRoom._id,
        );
        return {
          loginCode: res.data.passcode,
          availableRooms,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <StyledCheckInForm>
        <select defaultValue={''} onChange={this.setCurrentRoom}>
          <option value='' disabled>
            Select a Room
          </option>
          {this.state.availableRooms.map(room => (
            <option key={room._id} value={room._id}>
              Room: {room.name}
            </option>
          ))}
        </select>
        <input
          placeholder='name'
          onChange={event => this.setNameInput(event.target.value)}
        />
        <button onClick={this.checkInGuest}>Check In</button>
        <div>
          <h4>Login Code</h4>
          <p>{this.state.loginCode}</p>
        </div>
      </StyledCheckInForm>
    );
  }
}

CheckInForm.propTypes = {
  rooms: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    }),
  ).isRequired,
  hotel_id: propTypes.string.isRequired,
};

const StyledCheckInForm = styled.div``;

export default CheckInForm;