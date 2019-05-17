import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PT from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';

import PlanCheckoutForm from './PlanCheckoutForm';
import modalTheme from '../theme/modalTheme';
import theme from '../theme/styledTheme';

function EditPaymentMethodModal({
  fireCreateNewCustomer,
  billingEmail,
  handleInputChange,
  fireUpdateCustomerMethod,
  closeEditPaymentModal,
  editPaymentMethodModal,
  loading,
}) {
  return (
    <StripeProvider apiKey="pk_test_2tIDnmax83LWPMlH2j1eiu9a00CtNJbDfF">
      <Modal
        onRequestClose={closeEditPaymentModal}
        style={{
          overlay: modalTheme.overlay,
          content: modalTheme.paymentContent,
        }}
        isOpen={editPaymentMethodModal}
        ariaHideApp={false}
      >
        <StyledBtn onClick={closeEditPaymentModal}>
          <i class="fas fa-times-circle" />
        </StyledBtn>
        <Elements>
          <PlanCheckoutForm
            mode={'edit'}
            fireCreateNewCustomer={fireCreateNewCustomer}
            billingEmail={billingEmail}
            handleInputChange={handleInputChange}
            buttonText={'Confirm'}
            fireUpdateCustomerMethod={fireUpdateCustomerMethod}
            loading={loading}
          />
        </Elements>
      </Modal>
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

const StyledBtn = styled.button`
  border: none;
  outline: none;
  position: absolute;
  right: 5px;

  .fa-times-circle {
    background: white;
    border-radius: 50%;
    padding: 2.5%;
    color: ${theme.color.secondaryPurple};
    font-size: 2.5rem;

    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
    }
  }

  &:focus {
    outline: none;
  }
`;

export default EditPaymentMethodModal;
