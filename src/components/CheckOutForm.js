import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

class CheckOutForm extends React.Component {
  state = {
    EmailInput: '',
  };
  setEmailInput = EmailInput => {
    this.setState({ EmailInput });
  };
  render() {
    return (
      <StyledCheckOutForm>
        <select>
          {this.props.rooms.map(room => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <input
          placeholder='email'
          onChange={event => this.setEmailInput(event.target.value)}
        />
        <button>Check Out</button>
      </StyledCheckOutForm>
    );
  }
}
CheckOutForm.propTypes = {};

const StyledCheckOutForm = styled.div``;

export default CheckOutForm;
