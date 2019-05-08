import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';
import { DOMAIN, USERS } from '../utils/paths';

class CheckInForm extends React.Component {
  state = {
    nameInput: '',
    loginCode: '',
    currentRoom: null,
  };
  setNameInput = nameInput => {
    this.setState({ nameInput });
  };
  setCurrentRoom = event => {
    const room = this.props.rooms.find(room => room._id === event.target.value);
    this.setState({ currentRoom: room });
  };

  checkInGuest = () => {
    axios.post(`${DOMAIN}${USERS}`); //{hotel_id,user_type,name:this.state.nameInput,room}
  };

  render() {
    return (
      <StyledCheckInForm>
        <select defaultValue={''} onChange={this.setCurrentRoom}>
          <option value='' disabled>
            Select your option
          </option>
          {this.props.rooms.map(room => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <input
          placeholder='name'
          onChange={event => this.setNameInput(event.target.value)}
        />
        <button>Check In</button>
        <div>
          <h4>Login Code</h4>
          <p>{this.state.loginCode}</p>
        </div>
      </StyledCheckInForm>
    );
  }
}

CheckInForm.propTypes = {};

const StyledCheckInForm = styled.div``;

export default CheckInForm;
