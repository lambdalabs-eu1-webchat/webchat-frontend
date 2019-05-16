import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode.react';
import axios from 'axios';

import { DOMAIN, USERS, HOTEL, GUEST_CLIENT_DOMAIN } from '../utils/paths';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

class CheckInForm extends React.Component {
  state = {
    nameInput: '',
    loginCode: '',
    currentRoom: null,
    selectValue: 'DEFAULT',
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
          selectValue: 'DEFAULT',
          nameInput: '',
          guestToken: res.data.token,
          isCheckingIn: false,
        });
      } catch (error) {
        this.setState({ isCheckingIn: false });

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
          native={true}
          displayEmpty={true}
          className={
            this.state.errorRoom ? 'error hide-on-print' : 'hide-on-print'
          }
          value={this.state.selectValue}
          onChange={this.setSelectValue}
        >
          <option className="error hide-on-print" value="DEFAULT" disabled>
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
          className={
            this.state.errorName ? 'error hide-on-print' : 'hide-on-print'
          }
          onChange={event => this.setNameInput(event.target.value)}
          value={this.state.nameInput}
          margin="normal"
        />
        <div className="button-container">
          {this.state.isCheckingIn ? (
            <CircularProgress />
          ) : (
            <Button
              className="hide-on-print"
              variant="contained"
              color="primary"
              onClick={this.checkInGuest}
            >
              Check In
            </Button>
          )}
        </div>
        <p className="show-on-print">https://webchatlabs-guest.netlify.com</p>
        <div className="passcode">
          <span className="login-code-label">Login Code:</span>
          <span className="login-code">{this.state.loginCode}</span>
        </div>
        <QRCode value={`${GUEST_CLIENT_DOMAIN}#${this.state.guestToken}`} />
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
    width: 100%;
  }
  .button-container {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .error {
    background: red;
  }
  .passcode {
    width: 100%;
    min-width: 175px;
    background-color: #aed581;
    height: 50px;
    border-radius: 1%;
    padding: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .login-code-label {
      width: 100px;
      position: absolute;
      top: 6px;
      left: 6px;
    }
    .login-code {
      font-size: 30px;
      justify-self: center;
    }
    @media (max-width: 800px) {
      width: 100%;
    }
  }
  canvas {
    margin: 1rem auto;
  }
`;

export default CheckInForm;
