import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';
import { DOMAIN, HOTEL, USERS } from '../utils/paths';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
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

  checkOutGuest = async () => {
    const guest_id = this.state.selectValue;
    if (guest_id) {
      try {
        const didDel = await axios.delete(`${DOMAIN}${USERS}/${guest_id}`);
        if (didDel) {
          this.setState(cState => {
            const newCurrentGuests = cState.currentGuests.filter(
              guest => guest_id !== guest._id,
            );
            return { currentGuests: newCurrentGuests, selectValue: '' };
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
      <StyledCheckOutForm>
        <Select
          displayEmpty={true}
          className={this.state.errorRoom ? 'error' : ''}
          onChange={this.setSelectValue}
          value={this.state.selectValue}
        >
          <option value='' disabled>
            Select a Guest
          </option>
          {this.state.currentGuests.map(guest => (
            <option key={guest._id} value={guest._id}>
              Room: {guest.room.name} Guest: {guest.name}
            </option>
          ))}
        </Select>
        <Input
          placeholder='email'
          onChange={event => this.setEmailInput(event.target.value)}
        />
        <Button onClick={this.checkOutGuest}>Check Out</Button>
      </StyledCheckOutForm>
    );
  }
}
CheckOutForm.propTypes = {
  hotel_id: propTypes.string.isRequired,
};

const StyledCheckOutForm = styled.div`
  .error {
    background: red;
  }
`;

export default CheckOutForm;
