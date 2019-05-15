import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode.react';
import axios from 'axios';

import { DOMAIN, USERS, HOTEL } from '../utils/paths';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

class CheckInForm extends React.Component {
  state = {
    nameInput: '',
    loginCode: '',
    currentRoom: null,
    selectValue: '',
    errorRoom: false,
    errorName: false,
    guestToken: '',
    isCheckingIn: false,
  };

  setNameInput = nameInput => {
    this.setState({ nameInput, errorName: false });
  };
  setSelectValue = event => {
    this.setState({ selectValue: event.target.value, errorRoom: false });
  };

  checkInGuest = async () => {
    const room_id = this.state.selectValue;
    const room = this.props.availableRooms.find(room => room._id === room_id);
    const name = this.state.nameInput;
    if (name && room) {
      // turn on spinner
      this.setState({ isCheckingIn: true });
      try {
        const res = await axios.post(`${DOMAIN}${USERS}`, {
          hotel_id: this.props.hotel_id,
          user_type: 'guest',
          name,
          room: {
            name: room.name,
            id: room._id,
          },
        });
        const data = jwt.decode(res.data.token);
        this.props.filterAvailableRoom(room_id);
        this.props.addCurrentGuest(res.data.user);
        this.setState({
          loginCode: data.passcode,
          selectValue: '',
          nameInput: '',
          guestToken: res.data.token,
          isCheckingIn: false,
        });
      } catch (error) {
        console.error(error);
      }
    }
    if (!name) {
      this.setState({ errorName: true });
    }
    if (!room) {
      this.setState({ errorRoom: true });
    }
  };

  render() {
    return (
      <CheckInFormWrapper>
        <Select
          displayEmpty={true}
          className={this.state.errorRoom ? 'error' : ''}
          value={this.state.selectValue}
          onChange={this.setSelectValue}
        >
          <option className="error" value="" disabled>
            Select a Room
          </option>
          {this.props.availableRooms.map(room => (
            <option key={room._id} value={room._id}>
              Room: {room.name}
            </option>
          ))}
        </Select>
        <TextField
          placeholder="Name"
          className={this.state.errorName ? 'error' : ''}
          onChange={event => this.setNameInput(event.target.value)}
          value={this.state.nameInput}
          margin="normal"
        />
        {this.state.isCheckingIn ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={this.checkInGuest}
          >
            Check In
          </Button>
        )}

        <div className="passcode">
          <h4>Login Code</h4>
          <p>{this.state.loginCode}</p>
        </div>
        <QRCode value={`${DOMAIN}#${this.state.guestToken}`} />
      </CheckInFormWrapper>
    );
  }
}

CheckInForm.propTypes = {
  hotel_id: propTypes.string.isRequired,
};

const CheckInFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  button {
    margin-top: 10%;
  }
  .error {
    background: red;
  }
  button {
    margin-bottom: 5%;
  }
  .passcode {
    width: 90%;
    background-color: #aed581;
    height: 50px;
    border-radius: 1%;
    padding: 5%;
    p {
      text-align: center;
    }
  }
  canvas {
    margin: 1rem auto;
  }
`;

export default CheckInForm;
