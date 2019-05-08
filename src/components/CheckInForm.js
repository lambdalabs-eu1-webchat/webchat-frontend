import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

class CheckInForm extends React.Component {
  state = {
    nameInput: '',
  };
  setNameInput = nameInput => {
    this.setState({ nameInput });
  };

  render() {
    return (
      <StyledCheckInForm>
        <select>
          {this.props.rooms.map(room => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <input
          placeholder='name'
          onChange={event => this.setNameInput(event.target.value)}
        />
        <button>Check In</button>
      </StyledCheckInForm>
    );
  }
}

CheckInForm.propTypes = {};

const StyledCheckInForm = styled.div``;

export default CheckInForm;
