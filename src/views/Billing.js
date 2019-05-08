import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PT from 'prop-types';
import styled from 'styled-components';

import { fetchSingleHotel } from '../store/actions/hotel';
import { fetchHotelStaff } from '../store/actions/users';
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
    this.props.fetchSingleHotel(this.props.hotel_id);
    this.props.fetchHotelStaff(this.props.hotel_id);
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

  checkPlanSwitchEligibility = plan => {
    if (plan === 'free' && this.props.staff.length > 5) {
      return false;
    } else if (plan === 'pro' && this.props.staff.length > 15) {
      return false;
    } else {
      return true;
    }
  };

  fireSwitchCustomerPlan = plan => {
    const checkSwitchEligibility = this.checkPlanSwitchEligibility(plan);
    if (!this.props.hotel.billing) {
      return alert('Please add a payment method before switching plan');
    } else if (!checkSwitchEligibility) {
      return alert('You have too many staff accounts to switch to this plan');
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

Billing.propTypes = {
  hotel: PT.object.isRequired,
  fetchSingleHotel: PT.func.isRequired,
  createNewCustomer: PT.func.isRequired,
  switchCustomerPlan: PT.func.isRequired,
  updateCustomerMethod: PT.func.isRequired,
  fetchHotelStaff: PT.func.isRequired,
};

const mapStateToProps = state => ({
  hotel: state.hotel,
  hotel_id: state.currentUser.hotel_id,
  staff: state.users,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSingleHotel,
      createNewCustomer,
      switchCustomerPlan,
      updateCustomerMethod,
      fetchHotelStaff,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Billing);
