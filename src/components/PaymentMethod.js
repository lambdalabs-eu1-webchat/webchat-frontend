import React from 'react';
import Button from '@material-ui/core/Button';

import CardDetails from './CardDetails';
import Checkout from './Checkout';
import EditPaymentMethodModal from './EditPaymentMethodModal';

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
      <div>
        <CardDetails card={payment.card} email={payment.customer.email} />
        <Button variant="contained" color="primary" onClick={handleModalSwitch}>
          Change payment method
        </Button>
        <EditPaymentMethodModal
          fireCreateNewCustomer={fireCreateNewCustomer}
          billingEmail={billingEmail}
          handleInputChange={handleInputChange}
          editPaymentMethodModal={editPaymentMethodModal}
          handleModalSwitch={handleModalSwitch}
          fireUpdateCustomerMethod={fireUpdateCustomerMethod}
        />
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
