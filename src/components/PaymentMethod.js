import React from 'react';
import Button from '@material-ui/core/Button';

import CardDetails from './CardDetails';
import Checkout from './Checkout';

const PaymentMethod = ({
  payment,
  fireCreateNewCustomer,
  billingEmail,
  handleInputChange,
}) => {
  if (payment) {
    return (
      <div>
        <CardDetails card={payment.card} email={payment.customer.email} />
        <Button variant="contained" color="primary">
          Change payment method
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Checkout
          fireCreateNewCustomer={fireCreateNewCustomer}
          billingEmail={billingEmail}
          handleInputChange={handleInputChange}
        />
      </div>
    );
  }
};

export default PaymentMethod;
