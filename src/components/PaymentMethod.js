import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';

import CardDetails from './CardDetails';

const PaymentMethod = ({ payment, openNeedPaymentPlanModal }) => {
  if (payment) {
    return (
      <PaymentMethodWrapper>
        <h1>Billing</h1>
        <CardDetails
          payment={payment}
          card={payment.card}
          email={payment.customer.email}
          openNeedPaymentPlanModal={openNeedPaymentPlanModal}
        />
      </PaymentMethodWrapper>
    );
  } else {
    return (
      <PaymentMethodWrapper>
        <h1>Pricing plans</h1>
        <CardDetails
          card={emptyCard}
          email=""
          openNeedPaymentPlanModal={openNeedPaymentPlanModal}
        />
      </PaymentMethodWrapper>
    );
  }
};

const emptyCard = {
  brand: '',
  last_four: '',
  expiration: {
    month: '',
    year: ''
  }
};

PaymentMethod.propTypes = {
  openNeedPaymentPlanModal: PT.func.isRequired
};

const PaymentMethodWrapper = styled.div`
  margin: 0;
  width: 40%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export default PaymentMethod;
