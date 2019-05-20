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
  fireUpdateCustomerMethod,
  billingEmail,
  handleInputChange,
  loading,
  isPayment,
  closeRestrictedModal,
  alert,
  mode
}) {
  return (
    <Modal
      onRequestClose={closeRestrictedModal}
      style={{
        overlay: modalTheme.overlay,
        content: modalTheme.paymentContent
      }}
      isOpen={!isPayment}
      ariaHideApp={false}
    >
      <StyledBtn onClick={closeRestrictedModal}>
        <i className="fas fa-times-circle" />
      </StyledBtn>
      {alert && <Sth3>{alert}</Sth3>}
      <StripeProvider apiKey="pk_test_2tIDnmax83LWPMlH2j1eiu9a00CtNJbDfF">
        <div>
          <Elements>
            <PlanCheckoutForm
              fireCreateNewCustomer={fireCreateNewCustomer}
              fireUpdateCustomerMethod={fireUpdateCustomerMethod}
              billingEmail={billingEmail}
              handleInputChange={handleInputChange}
              buttonText={'Add payment method'}
              loading={loading}
              mode={mode}
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
  loading: PT.bool.isRequired
};

const Sth3 = styled.h3`
  color: ${theme.color.accentText};
  text-align: center;
  font-size: ${theme.fontSize.s};
  font-weight: bold;
`;

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
