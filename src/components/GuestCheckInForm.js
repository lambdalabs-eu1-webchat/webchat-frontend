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
          <h4>Login Code</h4>
          <p>{this.state.loginCode}</p>
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
    padding: 3rem;
    background: ${theme.color.lightPurple};
    font-size: ${theme.fontSize.xxs};
    color: ${theme.color.accentPurple};
    font-family: ${theme.font.fontFamily};
    font-weight: bold;
    height: 3rem;
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
  //.hide-on-print {
  //  padding: 30px;
  //}
  button {
    width: 100%;
    height: ${theme.button.smallButton};
    font-size: ${theme.fontSize.xs};
    border-radius: ${theme.border.radius};
    background:${theme.color.accentGreen};
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
  
  button {
    margin-bottom: 5%;
  }
  
  .passcode {
    width: 100%;
    background: ${theme.color.lightPurple};
    height: 8rem;
    border-radius: 5px;
    padding: 3rem;
    margin-bottom: 3rem;
    h4 {
      font-size: ${theme.fontSize.xxs};
      align-self: center;
    }
    
    p {
      text-align: center;
      padding-bottom: 1.5rem;
    }
  }
  canvas {
    margin: 1rem auto;
  }
`;

export default CheckInForm;
