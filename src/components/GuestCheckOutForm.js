import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';

import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { validate } from 'email-validator';
import Restricted from './reusable/RestrictedModal';
import { DOMAIN, HOTEL, USERS, EMAIL } from '../utils/paths';
import Spinner from '../components/reusable/Spinner';

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
    const room = { name: guest.room.name, _id: guest.room.id };
    if (guestEmail) {
      await this.sendGuestEmail();
    }
    if (guest_id && !this.state.emailInput) {
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
    if (!guest_id) {
      this.setState({ errorRoom: true });
    }
  };

  render() {
    return (
      <CheckOutFormWrapper>
        <Select
          native={true}
          displayEmpty={true}
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
        </Select>
        <TextField
          placeholder="Email"
          value={this.state.emailInput}
          onChange={event => this.setEmailInput(event.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.checkOutGuest}
        >
          {this.state.isCheckingOut ? <Spinner /> : 'Check Out'}
        </Button>

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
  button {
    width: 100%;
  }
  .error {
    background: red;
  }
  .button-container {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default CheckOutForm;
