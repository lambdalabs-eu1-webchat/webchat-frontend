import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSingleHotel } from '../store/actions/hotel';
import {
  switchCustomerPlan,
  createNewCustomer,
  updateCustomerMethod,
} from '../store/actions/subscription';
import { planIds } from '../utils/plans';
import PlanCards from '../components/PlanCards';
import PaymentMethod from '../components/PaymentMethod';

class Billing extends React.Component {
  state = {
    billingEmail: '',
    editPaymentMethodModal: false,
  };

  componentDidMount() {
    // hardcoded until merged with updated branch for get current user on login > hotel_id
    // this mount may be moved further up the chain
    this.props.fetchSingleHotel('5ccfe730a3c45a0394b71a3c');
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleModalSwitch = () => {
    this.setState({
      editPaymentMethodModal: !this.state.editPaymentMethodModal,
    });
  };

  closeModal = () => {
    this.setState({
      editPaymentMethodModal: false,
    })
  }

  fireSwitchCustomerPlan = plan => {
    if (!this.props.hotel.billing) {
      return alert('Please add a payment method before switching plan');
    } else {
      const newPlan = { newPlan: planIds[plan] };
      this.props.switchCustomerPlan(this.props.hotel._id, newPlan);
    }
  };

  fireCreateNewCustomer = token => {
    const enhancedStripeToken = {
      ...token,
      email: this.state.billingEmail,
      plan: planIds.free,
    };
    this.props.createNewCustomer(this.props.hotel._id, enhancedStripeToken);
  };

  fireUpdateCustomerMethod = async token => {
    const enhancedStripeToken = {
      ...token,
      email: this.state.billingEmail,
    }
    await this.props.updateCustomerMethod(this.props.hotel._id, enhancedStripeToken);
    this.closeModal();
  }

  render() {
    return (
      <div>
        <h2>Billing</h2>
        <PaymentMethod
          payment={this.props.hotel.billing}
          fireCreateNewCustomer={this.fireCreateNewCustomer}
          billingEmail={this.state.billingEmail}
          handleInputChange={this.handleInputChange}
          editPaymentMethodModal={this.state.editPaymentMethodModal}
          handleModalSwitch={this.handleModalSwitch}
          fireUpdateCustomerMethod={this.fireUpdateCustomerMethod}
        />
        {
          // do something to highlight to the user their current plan and disable the button on that plan card (done)
          // if a user clicks a plan without any payment method created, prompt them to add a payment method (done with alert)
          // if a user clicks on a plan they aren't eligible for, add a prompt to say why they can't switch plan (wait for merges)
          // if a user clicks on an elligibile plan, create a confirmation modal
        }
        <PlanCards
          hotel={this.props.hotel}
          fireSwitchCustomerPlan={this.fireSwitchCustomerPlan}
        />
        {
          // add a current payment method div showing card if they have one and ability to add one if not/edit existing one (this will sign up to a free plan automatically)
          // add/edit can be the same modal with React stripe elements - underlying component will then update with new information (done)
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
      createNewCustomer,
      updateCustomerMethod,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Billing);
