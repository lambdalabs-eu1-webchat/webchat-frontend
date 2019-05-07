import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlanCards from '../components/PlanCards';
import { fetchSingleHotel } from '../store/actions/hotel';

class Billing extends React.Component {

  componentDidMount() {
    // hardcoded until merged with updated branch for get current user on login
    this.props.fetchSingleHotel('5ccfe730a3c45a0394b719fc');
  }

  // when this component mounts, go and grab everything related to billing: current plan, billing object USING the hotel_id on state
  // connect action creators for paymentRoutes - 1) create new user/sub, 2) change plan, 3) change payment method

  render() {
    return (
      <div>
        <h2>Billing</h2>
          {
            // do something to highlight to the user their current plan and disable the button on that plan card
            // if a user clicks a plan without any payment method created, prompt them to add a payment method
            // if a user clicks on a plan they aren't eligible for, add a prompt to say why they can't switch plan
            // if a user clicks on an elligibile plan, create a confirmation modal
          }
          <PlanCards hotel={this.props.hotel}/>
        {
          // add a current payment method div showing card if they have one and ability to add one if not/edit existing one (this will sign up to a free plan automatically)
          // add/edit can be the same modal with React stripe elements - underlying component will then update with new information
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hotel: state.hotel,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSingleHotel,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Billing);
