import React from 'react';
import styled from 'styled-components';
import theme from './.././theme/styledTheme';
import propTypes from 'prop-types';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { validate } from 'email-validator';
import Restricted from './reusable/RestrictedModal';
import { DOMAIN, USERS, EMAIL } from '../utils/paths';

class CheckOutForm extends React.Component {
  state = {
    emailInput: '',
    selectedGuest: null,
    selectValue: 'DEFAULT',
    errorRoom: false,
    isCheckingOut: false,
    emailModalOpen: false,
    noChatModalOpen: false,
  };

  setSelectValue = event => {
    this.setState({ selectValue: event.target.value, errorRoom: false });
  };

  setEmailInput = emailInput => {
    this.setState({ emailInput });
  };

  sendGuestEmail = async () => {
    const emailDetails = {
      guestEmail: this.state.emailInput,
      guestId: this.state.selectValue,
      hotelId: this.props.hotel_id,
    };
    try {
      if (validate(emailDetails.guestEmail)) {
        const didSend = await axios.post(`${DOMAIN}${EMAIL}`, emailDetails);
        if (didSend.data) {
          this.setState({ emailInput: '' });
        } else {
          return alert(
            'This guest had no chats during their stay, please remove their email',
          );
        }
      } else {
        return alert('Please provide a valid email address');
      }
    } catch (error) {
      console.error(error);
    }
  };

  checkOutGuest = async () => {
    const guestEmail = this.state.emailInput;
    const guest_id = this.state.selectValue;
    const guest = this.props.currentGuests.find(
      guest => guest._id === guest_id,
    );

    if (guestEmail) {
      await this.sendGuestEmail();
    }
    if (guest_id !== 'DEFAULT' && !this.state.emailInput) {
      const room = { name: guest.room.name, _id: guest.room.id };
      this.setState({ isCheckingOut: true });
      try {
        const didDel = await axios.delete(`${DOMAIN}${USERS}/${guest_id}`);
        if (didDel) {
          this.props.filterCurrentGuests(guest_id);
          this.props.addAvailableRoom(room);
          this.setState({
            selectValue: 'DEFAULT',
            isCheckingOut: false,
          });
        }
      } catch (error) {
        this.setState({ isCheckingOut: false });

        console.error(error);
      }
    }
    if (guest_id === 'DEFAULT') {
      this.setState({ errorRoom: true });
    }
  };

  render() {
    return (
      <CheckOutFormWrapper>
        <select
          className={this.state.errorRoom ? 'error' : ''}
          onChange={this.setSelectValue}
          value={this.state.selectValue}
        >
          <option value="DEFAULT" disabled>
            Select a Guest
          </option>
          {this.props.currentGuests.map(guest => (
            <option key={guest._id} value={guest._id}>
              Room: {guest.room.name} Guest: {guest.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Email"
          value={this.state.emailInput}
          onChange={event => this.setEmailInput(event.target.value)}
        />

        {this.state.isCheckingOut ? (
          <CircularProgress />
        ) : (
          <button color="primary" onClick={this.checkOutGuest}>
            Check Out
          </button>
        )}

        {this.state.emailModalOpen && (
          <Restricted
            alert="Please provide a valid email address"
            isRestrictedModalOpen={this.state.emailModalOpen}
            closeRestrictedModal={this.closeRestrictedModal}
          />
        )}

        {this.state.noChatModalOpen && (
          <Restricted
            alert="This guest had no chats during their stay, please remove their email"
            isRestrictedModalOpen={this.state.noChatModalOpen}
            closeRestrictedModal={this.closeRestrictedModal}
          />
        )}
      </CheckOutFormWrapper>
    );
  }
}

CheckOutForm.propTypes = {
  hotel_id: propTypes.string.isRequired,
};

const CheckOutFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;

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
`;

export default CheckOutForm;
