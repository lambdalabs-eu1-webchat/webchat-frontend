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
        <StyledBtn>
          <button id="close" onClick={closeEditPaymentModal}>
            X
          </button>
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

const StyledBtn = styled.div`
  button {
    border: none;
    outline: none;
    background: none;
    color: ${theme.color.textColor};
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 2px;
    top: 2px;
    font-size: ${theme.fontSize.s};
    font-weight: bold;
    text-align: center;
    box-shadow: none;
    margin: 0;
    &:hover {
      box-shadow: none;
      color: ${theme.color.accentPurple};
      cursor: pointer;
      transition: all 0.3s ease;
    }
    &:focus {
      outline: none;
    }
  }
`;

export default EditPaymentMethodModal;
