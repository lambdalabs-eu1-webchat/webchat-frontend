import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { fetchSingleHotel } from '../store/actions/hotel';
import {
  switchCustomerPlan,
  createNewCustomer,
  updateCustomerMethod,
} from '../store/actions/subscription';
import { planIds } from '../utils/plans';
import PlanCards from '../components/PlanCards';
import PaymentMethod from '../components/PaymentMethod';

const BillingWrapper = styled.div`
  padding: 10% 25%;
`;

class Billing extends React.Component {
  state = {
    billingEmail: '',
    editPaymentMethodModal: false,
  };

  componentDidMount() {
    // hardcoded until merged with updated branch for get current user on login inc. hotel_id key
    this.props.fetchSingleHotel('5ccfe730a3c45a0394b71a30');
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
    });
  };

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
    };
    await this.props.updateCustomerMethod(
      this.props.hotel._id,
      enhancedStripeToken,
    );
    this.closeModal();
  };

  render() {
    return (
      <BillingWrapper>
        <h2>Billing</h2>
        <PlanCards
          hotel={this.props.hotel}
          fireSwitchCustomerPlan={this.fireSwitchCustomerPlan}
        />
        <PaymentMethod
          payment={this.props.hotel.billing}
          fireCreateNewCustomer={this.fireCreateNewCustomer}
          billingEmail={this.state.billingEmail}
          handleInputChange={this.handleInputChange}
          editPaymentMethodModal={this.state.editPaymentMethodModal}
          handleModalSwitch={this.handleModalSwitch}
          fireUpdateCustomerMethod={this.fireUpdateCustomerMethod}
        />
      </BillingWrapper>
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
