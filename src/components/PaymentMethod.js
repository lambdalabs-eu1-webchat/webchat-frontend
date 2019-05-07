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
        <h1>No payment method yet :(</h1>
        <Checkout
          fireCreateNewCustomer={fireCreateNewCustomer}
          billingEmail={billingEmail}
          handleInputChange={handleInputChange}
        />
        <Button variant="contained" color="primary">
          Add payment method
        </Button>
      </div>
    );
  }
};

export default PaymentMethod;
