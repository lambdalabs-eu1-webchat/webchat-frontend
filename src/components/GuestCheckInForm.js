import React from 'react';
import styled from 'styled-components';
import theme from './../theme/styledTheme';
import propTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode.react';
import axios from 'axios';

import { DOMAIN, USERS, GUEST_CLIENT_DOMAIN } from '../utils/paths';
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
        <select
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
        </select>
        <input
          placeholder="Name"
          className={
            this.state.errorName ? 'error hide-on-print' : 'hide-on-print'
          }
          onChange={event => this.setNameInput(event.target.value)}
          value={this.state.nameInput}
        />
        {this.state.isCheckingIn ? (
          <CircularProgress />
        ) : (
          <button
            className="hide-on-print"
            variant="contained"
            color="primary"
            onClick={this.checkInGuest}
          >
            Check In
          </button>
        )}
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
  select {
    background: ${theme.color.lightPurple};
    font-size: ${theme.fontSize.xxs};
    color: ${theme.color.accentPurple};
    font-family: ${theme.font.fontFamily};
    font-weight: bold;
    height: 6rem;
    border: none;
    &:focus {
      outline: none;
    }
  }
  input {
    border: none;
    border-bottom: 1px solid ${theme.color.footerText};
    margin: 2rem 0;
    height: ${theme.input.height};
    font-size: ${theme.fontSize.xs};
    padding: 20px 0;
    border-radius: 0;
    &:focus {
      outline: none;
    }
  }

  button {
    width: 100%;
    height: ${theme.button.smallButton};
    font-size: ${theme.fontSize.xxs};
    border-radius: ${theme.border.radius};
    background: ${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    margin: 15px 0;
    box-shadow: ${theme.shadow.buttonShadow};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
    &:first-child {
      margin-right: 1.5rem;
    }
    @media (max-width: 1200px) {
      width: 100%;
      height: ${theme.button.smallButton};
      margin: 0 0 1.5rem 0;
      &:first-child {
        margin-right: 0;
      }
    }
    @media (max-width: 800px) {
      height: ${theme.button.height};
      font-size: ${theme.fontSize.xs};
    }
  }

  .error {
    box-shadow: 0 0 3px red;
  }

  .passcode {
    width: 100%;
    min-width: 175px;
    background-color: ${theme.color.lightPurple};
    height: 8rem;
    border-radius: 5px;
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .login-code-label {
      width: 100px;
      position: absolute;
      font-size: ${theme.fontSize.xxs};
      font-family: ${theme.font.fontFamily};
      font-weight: bold;
      color: ${theme.color.accentPurple};
      top: 6px;
      left: 6px;
    }
    .login-code {
      font-size: ${theme.fontSize.m};
      color: ${theme.color.accentPurple};
      justify-self: center;
    }
    @media (max-width: 800px) {
      width: 100%;
    }
  }
  canvas {
    margin: 2rem auto;
  }
`;

export default CheckInForm;
