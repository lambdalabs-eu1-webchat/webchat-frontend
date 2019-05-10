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

CheckInOrOut.propTypes = {
  hotel_id: propTypes.string.isRequired,
};

const StyledCheckInOrOut = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  margin: auto;
  @media (max-width: 1200px) {
    margin-top: 4%;
  }
  h1 {
    padding: 10% 0;
    font-size: 1.5rem;
  }
  div {
    width: 95%;
  }
`;

function mapStateToProps(state) {
  return {
    hotel_id: state.currentUser.hotel_id,
  };
}

export default connect(mapStateToProps)(CheckInOrOut);
