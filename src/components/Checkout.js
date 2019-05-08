import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PT from 'prop-types';

import CheckoutForm from './CheckoutForm';


function Checkout({ fireCreateNewCustomer, billingEmail, handleInputChange }) {
  return (
    // move this test key into dotenv
    <StripeProvider apiKey="pk_test_2tIDnmax83LWPMlH2j1eiu9a00CtNJbDfF">
      <div>
        <Elements>
          <CheckoutForm
            fireCreateNewCustomer={fireCreateNewCustomer}
            billingEmail={billingEmail}
            handleInputChange={handleInputChange}
            buttonText={'Add payment method'}
          />
        </Elements>
      </div>
    </StripeProvider>
  );
}

Checkout.propTypes = {
  fireCreateNewCustomer: PT.func.isRequired,
  billingEmail: PT.string.isRequired,
  handleInputChange: PT.func.isRequired,
}

export default Checkout;
