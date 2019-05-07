import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import CheckoutForm from './CheckoutForm';

const EditPaymentMethodModalWrapper = styled.div`
  display: ${props => props.modalstatus};
  background-color: blanchedalmond;
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function EditPaymentMethodModal({
  fireCreateNewCustomer,
  billingEmail,
  handleInputChange,
  editPaymentMethodModal,
  handleModalSwitch,
  fireUpdateCustomerMethod,
}) {
  return (
    // move this test key into dotenv
    <StripeProvider apiKey="pk_test_2tIDnmax83LWPMlH2j1eiu9a00CtNJbDfF">
      <EditPaymentMethodModalWrapper
        modalstatus={editPaymentMethodModal ? 'block' : 'none'}
      >
        <Button variant="contained" color="primary" onClick={handleModalSwitch}>
          x
        </Button>
        <Elements>
          <CheckoutForm
            mode={'edit'}
            fireCreateNewCustomer={fireCreateNewCustomer}
            billingEmail={billingEmail}
            handleInputChange={handleInputChange}
            buttonText={'Change payment method'}
            fireUpdateCustomerMethod={fireUpdateCustomerMethod}
          />
        </Elements>
      </EditPaymentMethodModalWrapper>
    </StripeProvider>
  );
}

export default EditPaymentMethodModal;
