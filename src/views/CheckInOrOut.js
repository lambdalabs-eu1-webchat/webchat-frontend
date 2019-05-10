import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckInForm from '../components/GuestCheckInForm';
import CheckOutForm from '../components/GuestCheckOutForm';

class CheckInOrOut extends React.Component {
  render() {
    return (
      <StyledCheckInOrOut>
        <div>
          <h1>Check-in</h1>
          <CheckInForm hotel_id={this.props.hotel_id} />
        </div>
        <div>
          <h1>Check-out</h1>
          <CheckOutForm hotel_id={this.props.hotel_id} />
        </div>
      </StyledCheckInOrOut>
    );
  }
}

const StyledCheckInOrOut = styled.div`
width: 70%;
  padding: 5% 0;
  display: flex;
  justify-content: space-around;
  margin: auto;
  h1 {
    padding: 10% 0;
    font-size: 1.5rem;
  }
  div {
    width: 95%;
  }
`;

CheckInOrOut.propTypes = {
  hotel_id: propTypes.string.isRequired,
};

function mstp(state) {
  return {
    hotel_id: state.currentUser.hotel_id,
  };
}

export default connect(mstp)(CheckInOrOut);
