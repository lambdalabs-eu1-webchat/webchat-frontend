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
  updateCustomerMethod
} from '../store/actions/subscription';
import { planIds } from '../utils/plans';
import PlanCards from '../components/PlanCards';
import PaymentMethod from '../components/PaymentMethod';
import Restricted from '../components/reusable/RestrictedModal';
import theme from '../theme/styledTheme';
import PlanCheckout from '../components/PlanCheckout';

class Billing extends React.Component {
  state = {
    billingEmail: '',
    editPaymentMethodModal: false,
    isPaymentPlanModalOpen: false,
    isHasManyAccsModalOpen: false
  };

  componentDidMount() {
    this.props.fetchSingleHotel(this.props.hotel_id);
    this.props.fetchHotelStaff(this.props.hotel_id);
  }

  openNeedPaymentPlanModal = () => {
    this.setState({ isPaymentPlanModalOpen: true });
  };

  openHasManyAccsModal = () => {
    this.setState({ isHasManyAccsModalOpen: true });
  };

  closeRestrictedModal = () => {
    this.setState({ isPaymentPlanModalOpen: false });
    this.setState({ isHasManyAccsModalOpen: false });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleModalSwitch = () => {
    this.setState({
      editPaymentMethodModal: !this.state.editPaymentMethodModal
    });
  };

  closeEditPaymentModal = () => {
    this.setState({
      editPaymentMethodModal: false
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
      this.openNeedPaymentPlanModal();
    } else if (!checkSwitchEligibility) {
      this.openHasManyAccsModal();
    } else {
      const newPlan = { newPlan: planIds[plan] };
      this.props.switchCustomerPlan(this.props.hotel._id, newPlan);
    }
  };

  fireCreateNewCustomer = token => {
    const enhancedStripeToken = {
      ...token,
      email: this.state.billingEmail,
      plan: planIds.free
    };
    this.props.createNewCustomer(this.props.hotel._id, enhancedStripeToken);
  };

  fireUpdateCustomerMethod = async token => {
    const enhancedStripeToken = {
      ...token,
      email: this.state.billingEmail
    };
    await this.props.updateCustomerMethod(
      this.props.hotel._id,
      enhancedStripeToken
    );
    this.closeEditPaymentModal();
  };

  render() {
    return (
      <BillingWrapper>
        <PaymentMethod
          payment={this.props.hotel.billing}
          fireCreateNewCustomer={this.fireCreateNewCustomer}
          billingEmail={this.state.billingEmail}
          handleInputChange={this.handleInputChange}
          editPaymentMethodModal={this.state.editPaymentMethodModal}
          handleModalSwitch={this.handleModalSwitch}
          fireUpdateCustomerMethod={this.fireUpdateCustomerMethod}
          loading={this.props.loading}
          closeEditPaymentModal={this.closeEditPaymentModal}
        />
        <PlanCards
          hotel={this.props.hotel}
          fireSwitchCustomerPlan={this.fireSwitchCustomerPlan}
          loading={this.props.loading}
        />

        {this.state.isPaymentPlanModalOpen && (
          <PlanCheckout
            alert="Please add a payment method before switching plan"
            isRestrictedModalOpen={this.state.isPaymentPlanModalOpen}
            closeRestrictedModal={this.closeRestrictedModal}
            fireCreateNewCustomer={this.fireCreateNewCustomer}
            billingEmail={this.billingEmail}
            handleInputChange={this.handleInputChange}
            loading={this.props.loading}
            isPayment={false}
          />
        )}

        {this.state.isHasManyAccsModalOpen && (
          <Restricted
            alert="You have too many staff accounts to switch to this plan"
            isRestrictedModalOpen={this.state.isHasManyAccsModalOpen}
            closeRestrictedModal={this.closeRestrictedModal}
          />
        )}
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
  staff: PT.array.isRequired,
  loading: PT.object.isRequired
};

const mapStateToProps = state => ({
  hotel: state.hotel,
  hotel_id: state.currentUser.hotel_id,
  staff: state.users,
  loading: state.loading
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSingleHotel,
      createNewCustomer,
      switchCustomerPlan,
      updateCustomerMethod,
      fetchHotelStaff
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing);

const BillingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 730px;
  h1 {
    font-size: ${theme.fontSize.l};
    padding: 1.5rem 0;
    //width: 60%;
    color: ${theme.color.textColor};
    @media (max-width: 1000px) {
      width: 90%;
    }
  }
  margin: 0 3rem;

  @media (max-width: 1400px) {
    flex-direction: column;
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 95%;
    padding: 10% 0 15% 0;
    margin: 0 auto;
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
  }
`;
