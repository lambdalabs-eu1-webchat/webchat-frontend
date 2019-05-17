import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PT from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';

import PlanCheckoutForm from './PlanCheckoutForm';
import modalTheme from '../theme/modalTheme';
import theme from '../theme/styledTheme';

function PlanCheckout({
  fireCreateNewCustomer,
  billingEmail,
  handleInputChange,
  loading,
  isPayment,
}) {
  const backFromAddPaymentModal = () => {
    window.history.back();
  };

  return (
    <Modal
      onRequestClose={backFromAddPaymentModal}
      style={{
        overlay: modalTheme.overlay,
        content: modalTheme.paymentContent,
      }}
      isOpen={!isPayment}
      ariaHideApp={false}
    >
      <StyledBtn onClick={backFromAddPaymentModal}>
        <i class="fas fa-times-circle" />
      </StyledBtn>
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
    </Modal>
  );
}

PlanCheckout.propTypes = {
  fireCreateNewCustomer: PT.func.isRequired,
  billingEmail: PT.string.isRequired,
  handleInputChange: PT.func.isRequired,
  loading: PT.bool.isRequired,
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

export default PlanCheckout;
