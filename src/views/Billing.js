import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSingleHotel } from '../store/actions/hotel';
import { switchCustomerPlan } from '../store/actions/subscription';
import { planIds } from '../utils/plans';
import PlanCards from '../components/PlanCards';
import PaymentMethod from '../components/PaymentMethod';

class Billing extends React.Component {
  componentDidMount() {
    // hardcoded until merged with updated branch for get current user on login
    this.props.fetchSingleHotel('5ccfe730a3c45a0394b719fc');
    // no plan = 5ccfe730a3c45a0394b71a30
    // plan and card obj =  5ccfe730a3c45a0394b719fc
  }

  // when this component mounts, go and grab everything related to billing: current plan, billing object USING the hotel_id on state
  // connect action creators for paymentRoutes - 1) create new user/sub, 2) change plan, 3) change payment method

  fireSwitchCustomerPlan = (hotelId, plan) => {
    this.props.switchCustomerPlan(hotelId, planIds[plan]);
  }

  render() {
    return (
      <div>
        <h2>Billing</h2>
        <PaymentMethod payment={this.props.hotel.billing} />
        {
          // do something to highlight to the user their current plan and disable the button on that plan card
          // if a user clicks a plan without any payment method created, prompt them to add a payment method
          // if a user clicks on a plan they aren't eligible for, add a prompt to say why they can't switch plan
          // if a user clicks on an elligibile plan, create a confirmation modal
        }
        <PlanCards hotel={this.props.hotel} />
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
      switchCustomerPlan,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Billing);
