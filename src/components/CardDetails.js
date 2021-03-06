import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import theme from '../theme/styledTheme';

const CardDetails = ({ payment, card, email, openNeedPaymentPlanModal }) => {
  return (
    <div>
      <CardDetailsWrapper>
        <h3>Credit card information</h3>
        <span>Card: {card.brand}</span>
        <span>Last four digits: {card.last_four}</span>
        <span>
          Expiration: {card.expiration.month}
          {card.brand === '' ? '' : '/'}
          {card.expiration.year}
        </span>
        <span>Receipts sent to: {email}</span>
        <button onClick={openNeedPaymentPlanModal}>
          {card.brand ? 'Edit' : 'Add'}
        </button>
      </CardDetailsWrapper>
    </div>
  );
};

CardDetails.propTypes = {
  card: PT.shape({
    brand: PT.string.isRequired,
    last_four: PT.string.isRequired,
    expiration: PT.shape({
      month: PT.isRequired,
      year: PT.isRequired,
    }).isRequired,
  }).isRequired,
  email: PT.string.isRequired,
  openNeedPaymentPlanModal: PT.func.isRequired,
};

export default CardDetails;

const CardDetailsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  max-width: 300px;
  margin: 0;
  padding: 5rem 0;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 600px) {
    max-width: 100%;
  }

  h3 {
    color: ${theme.color.accentText};
    text-align: left;
    font-size: ${theme.fontSize.s};
    font-weight: bold;
    padding: 15px 0;
  }

  span {
    font-size: ${theme.fontSize.xs};
    margin: 0.5rem 0;
  }

  button {
    width: 15rem;
    margin: 2rem 0;
    font-size: ${theme.fontSize.xxs};
    border-radius: ${theme.border.radius};
    background: ${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    box-shadow: ${theme.shadow.buttonShadow};
    height: ${theme.button.smallButton};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
      transition: all 0.3s ease;
    }
    &:focus {
      outline: none;
    }
    @media (max-width: 600px) {
      width: 100%;
      height: ${theme.button.height};
      font-size: ${theme.fontSize.xs};
    }
  }
`;
