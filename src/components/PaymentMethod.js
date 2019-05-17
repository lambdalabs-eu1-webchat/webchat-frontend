import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import CardDetails from './CardDetails';
import PlanCheckout from './PlanCheckout';
import EditPaymentMethodModal from './EditPaymentMethodModal';

const PaymentMethod = ({
  payment,
  fireCreateNewCustomer,
  billingEmail,
  handleInputChange,
  editPaymentMethodModal,
  handleModalSwitch,
  fireUpdateCustomerMethod,

  closeEditPaymentModal,
}) => {
  if (payment) {
    return (
      <PaymentMethodWrapper>
        <h1>Pricing plans</h1>
        <CardDetails
          card={payment.card}
          email={payment.customer.email}
          handleModalSwitch={handleModalSwitch}
        />
        <EditPaymentMethodModal
          fireCreateNewCustomer={fireCreateNewCustomer}
          billingEmail={billingEmail}
          handleInputChange={handleInputChange}
          editPaymentMethodModal={editPaymentMethodModal}
          handleModalSwitch={handleModalSwitch}
          fireUpdateCustomerMethod={fireUpdateCustomerMethod}
          closeEditPaymentModal={closeEditPaymentModal}
        />
      </PaymentMethodWrapper>
    );
  } else {
    return (
      <PaymentMethodWrapper>
        <PlanCheckout
          fireCreateNewCustomer={fireCreateNewCustomer}
          billingEmail={billingEmail}
          handleInputChange={handleInputChange}
          isPayment={payment ? true : false}
        />
      </PaymentMethodWrapper>
    );
  }
};

PaymentMethod.propTypes = {
  billingEmail: PT.string.isRequired,
  fireCreateNewCustomer: PT.func.isRequired,
  handleInputChange: PT.func.isRequired,
  editPaymentMethodModal: PT.bool.isRequired,
  handleModalSwitch: PT.func.isRequired,
  fireUpdateCustomerMethod: PT.func.isRequired,
};

const PaymentMethodWrapper = styled.div`
margin: 0;
width: 40%;
@media(max-width: 600px) {
width: 100%;
}
`;

export default PaymentMethod;
