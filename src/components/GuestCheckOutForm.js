import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';
import { DOMAIN, HOTEL, USERS, EMAIL } from '../utils/paths';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class CheckOutForm extends React.Component {
  state = {
    emailInput: '',
    currentGuests: [],
    selectedGuest: null,
    selectValue: '',
    errorRoom: false,
  };

  componentDidMount() {
    // get the hotels current guests
    axios
      .get(`${DOMAIN}${HOTEL}/${this.props.hotel_id}/guests?status=here`)
      .then(res => {
        this.setState({ currentGuests: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

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
      await axios.post(`${DOMAIN}${EMAIL}`, emailDetails);
      this.setState({ emailInput: '' });
    } catch (error) {
      console.error(error);
    }
  };

  checkOutGuest = async () => {
    const guestEmail = this.state.emailInput;
    const guest_id = this.state.selectValue;
    if (guestEmail) {
      this.sendGuestEmail();
    }
    if (guest_id) {
      try {
        const didDel = await axios.delete(`${DOMAIN}${USERS}/${guest_id}`);
        if (didDel) {
          this.setState(cState => {
            const newCurrentGuests = cState.currentGuests.filter(
              guest => guest_id !== guest._id,
            );
            return {
              currentGuests: newCurrentGuests,
              selectValue: '',
            };
          });
        }
      } catch (error) {
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
          displayEmpty={true}
          className={this.state.errorRoom ? 'error' : ''}
          onChange={this.setSelectValue}
          value={this.state.selectValue}
        >
          <option value="" disabled>
            Select a Guest
          </option>
          {this.state.currentGuests.map(guest => (
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
          Check Out
        </Button>
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
    margin-top: 10%;
  }
  .error {
    background: red;
  }
  button {
    margin-bottom: 5%;
  }
`;

export default CheckOutForm;
