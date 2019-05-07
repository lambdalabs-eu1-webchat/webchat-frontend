import React from 'react';
import styled from 'styled-components';

import CardDetails from './CardDetails';
import Checkout from './Checkout';
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
        <CardDetails card={payment.card} email={payment.customer.email} handleModalSwitch={handleModalSwitch}/>
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
        <Checkout
          fireCreateNewCustomer={fireCreateNewCustomer}
          billingEmail={billingEmail}
          handleInputChange={handleInputChange}
        />
      </PaymentMethodWrapper>
    );
  }
};

export default PaymentMethod;
