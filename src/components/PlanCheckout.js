import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PT from 'prop-types';

import PlanCheckoutForm from './PlanCheckoutForm';


function PlanCheckout({ fireCreateNewCustomer, billingEmail, handleInputChange, loading }) {
  return (
    // move this test key into dotenv
    <StripeProvider apiKey="pk_test_2tIDnmax83LWPMlH2j1eiu9a00CtNJbDfF">
      <div>
        <Elements>
          <PlanCheckoutForm
            fireCreateNewCustomer={fireCreateNewCustomer}
            billingEmail={billingEmail}
            handleInputChange={handleInputChange}
            buttonText={'Add payment method'}
            loading={loading}
          />
        </Elements>
      </div>
    </StripeProvider>
  );
}

PlanCheckout.propTypes = {
  fireCreateNewCustomer: PT.func.isRequired,
  billingEmail: PT.string.isRequired,
  handleInputChange: PT.func.isRequired,
}

export default PlanCheckout;
