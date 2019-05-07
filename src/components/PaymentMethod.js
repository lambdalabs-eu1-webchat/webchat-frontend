import React from 'react';
import Button from '@material-ui/core/Button';

import CardDetails from './CardDetails';
import Checkout from './Checkout';

const PaymentMethod = ({ payment }) => {
  if (payment) {
    return (
      <div>
        <CardDetails card={payment.card} email={payment.customer.email}/>
        <Button variant="contained" color="primary">
          Change payment method
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>No payment method yet :(</h1>;
        <Checkout />
        <Button variant="contained" color="primary">
          Add payment method
        </Button>
      </div>
    );
  }
};

export default PaymentMethod;
