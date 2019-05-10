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
          check in
          <CheckInForm hotel_id={this.props.hotel_id} />
        </div>
        <div>
          checkout
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
  display: flex;
  justify-content: space-around;
`;

function mapStateToProps(state) {
  return {
    hotel_id: state.currentUser.hotel_id,
  };
}

export default connect(mapStateToProps)(CheckInOrOut);
