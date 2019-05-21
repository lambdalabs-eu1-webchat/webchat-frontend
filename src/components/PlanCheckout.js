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
      <StyledBtn>
        <button onClick={backFromAddPaymentModal}>
          X
        </button>
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

const StyledBtn = styled.div`
  background: none;
  border: none;
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

export default PlanCheckout;
