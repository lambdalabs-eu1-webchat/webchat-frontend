import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';
import { DOMAIN, HOTEL, USERS } from '../utils/paths';
class CheckOutForm extends React.Component {
  state = {
    emailInput: '',
    currentGuests: [],
    selectedGuest: null,
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

  setSelectedGuest = event => {
    const selectedGuest = this.state.currentGuests.find(
      guest => guest._id === event.target.value,
    );
    this.setState({ selectedGuest });
  };

  setEmailInput = emailInput => {
    this.setState({ emailInput });
  };

  checkOutGuest = async () => {
    if (this.state.selectedGuest) {
      const guest_id = this.state.selectedGuest._id;
      try {
        const didDel = await axios.delete(`${DOMAIN}${USERS}/${guest_id}`);
        if (didDel) {
          this.setState(cState => {
            const newCurrentGuests = cState.currentGuests.filter(
              guest => guest_id !== guest._id,
            );
            return { currentGuests: newCurrentGuests };
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  render() {
    return (
      <StyledCheckOutForm>
        <select onChange={this.setSelectedGuest} defaultValue={''}>
          <option value='' disabled>
            Select a Guest
          </option>
          {this.state.currentGuests.map(guest => (
            <option key={guest._id} value={guest._id}>
              Room: {guest.room.name} Guest: {guest.name}
            </option>
          ))}
        </select>
        <input
          placeholder='email'
          onChange={event => this.setEmailInput(event.target.value)}
        />
        <button onClick={this.checkOutGuest}>Check Out</button>
      </StyledCheckOutForm>
    );
  }
}
CheckOutForm.propTypes = {
  hotel_id: propTypes.string.isRequired,
};

const StyledCheckOutForm = styled.div``;

export default CheckOutForm;
