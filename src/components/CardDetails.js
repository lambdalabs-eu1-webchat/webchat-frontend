import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import theme from '../theme/styledTheme';

const CardDetailsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 660px;
  margin: 0 2rem;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  h3 {
    color: ${theme.color.accentText};
    text-align: left;
    font-size: ${theme.fontSize.s};
    font-weight: bold;
  }

  span {
    font-size: ${theme.fontSize.xs};
    margin: 0.5rem 0;
  }

  button {
    width: 15rem;
    padding: 1rem;
    margin: 2rem 0;
    font-size: ${theme.fontSize.xxs};
    border-radius: ${theme.border.radius};
    background: ${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    box-shadow: ${theme.shadow.buttonShadow};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }
`;

const CardDetails = ({ card, email, handleModalSwitch }) => {
  return (
    <div>
      <CardDetailsWrapper>
        <h3>Credit card information</h3>
        <span>Card: {card.brand}</span>
        <span>Last four digits: ... {card.last_four}</span>
        <span>
          Expiration: {card.expiration.month}/{card.expiration.year}
        </span>
        <span>Receipts sent to: {email}</span>
        <button onClick={handleModalSwitch}>Edit</button>
      </CardDetailsWrapper>
    </div>
  );
};

CardDetails.propTypes = {
  card: PT.shape({
    brand: PT.string.isRequired,
    last_four: PT.string.isRequired,
    expiration: PT.shape({
      month: PT.number.isRequired,
      year: PT.number.isRequired,
    }).isRequired,
  }).isRequired,
  email: PT.string.isRequired,
  handleModalSwitch: PT.func.isRequired,
};

export default CardDetails;
