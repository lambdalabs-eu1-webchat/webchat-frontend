import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import CardDetails from './CardDetails';
import PlanCheckout from './PlanCheckout';
import EditPaymentMethodModal from './EditPaymentMethodModal';

const PaymentMethodWrapper = styled.div`
  padding-top: 10%;
`;

const PaymentMethod = ({
  payment,
  fireCreateNewCustomer,
  billingEmail,
  handleInputChange,
  editPaymentMethodModal,
  handleModalSwitch,
  fireUpdateCustomerMethod,
}) => {
  if (payment) {
    return (
      <PaymentMethodWrapper>
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

export default PaymentMethod;
