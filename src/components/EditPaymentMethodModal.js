import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
import PT from 'prop-types';
import styled from 'styled-components';

import PlanCheckoutForm from './PlanCheckoutForm';
import Spinner from '../components/reusable/Spinner';

const EditPaymentMethodModalWrapper = styled.div`
  display: ${props => props.modalstatus};
  background-color: lightgrey;
  z-index: 1;
  width: 50%;
  position: absolute;
  top: 10%;
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
  loading,
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
          <PlanCheckoutForm
            mode={'edit'}
            fireCreateNewCustomer={fireCreateNewCustomer}
            billingEmail={billingEmail}
            handleInputChange={handleInputChange}
            buttonText={'Change payment method'}
            fireUpdateCustomerMethod={fireUpdateCustomerMethod}
            loading={loading}
          />
        </Elements>
      </EditPaymentMethodModalWrapper>
    </StripeProvider>
  );
}

EditPaymentMethodModal.propTypes = {
  fireCreateNewCustomer: PT.func.isRequired,
  billingEmail: PT.string.isRequired,
  handleInputChange: PT.func.isRequired,
  editPaymentMethodModal: PT.bool.isRequired,
  handleModalSwitch: PT.func.isRequired,
  fireUpdateCustomerMethod: PT.func.isRequired,
};

export default EditPaymentMethodModal;
