import React from 'react';
import PT from 'prop-types';
import styled from 'styled-components';
import theme from '../theme/styledTheme';

import Spinner from '../components/reusable/Spinner';

const HighlighterWrapper = styled.div`
  background-color: ${props => props.highlight};
  border-radius: 5px;
  text-align: center;
  width: 30%;
  max-width: 320px;
  padding: 2rem;
  margin: 2rem;
  box-shadow: 0 16px 48px rgba(32, 41, 50, 0.21);
  @media (max-width: 1000px) {
    padding: 4rem;
    margin: 3rem auto;
    width: 100%;
  }

  h2 {
    font-weight: bold;
    text-align: center;
    font-size: ${theme.fontSize.m};
    color: ${theme.color.accentText};
  }

  ul {
    padding: 0 5%;

    li {
      font-size: ${theme.fontSize.xs};
      padding: 5% 0;
      text-align: left;
    }
  }

  .fa-check {
    background: #e2fdf8;
    border: 1px solid white;
    border-radius: 50%;
    padding: 2.5%;
    color: ${theme.color.accentGreen};
    font-size: 1rem;
    margin-right: 2.5%;
  }

  button {
    width: 15rem;
    min-width: 150px;
    padding: 2rem;
    font-size: ${theme.fontSize.xxs};
    border-radius: ${theme.border.radius};
    background: ${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    margin: 15px 0;
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

const PriceTag = styled.div`
  color: ${theme.color.accentText};
  text-align: center;
  font-size: ${theme.fontSize.s};
  font-weight: bold;
  padding: 5% 0;
`;

const PlanCard = ({ plan, current, fireSwitchCustomerPlan, loading }) => {
  return (
    <HighlighterWrapper
      highlight={current ? 'blanchedalmond' : theme.color.lightPurple}
    >
      <h2>{plan.title.toUpperCase()}</h2>
      <ul>
        {plan.features.map(feature => (
          <li key={feature}>
            <i className="fas fa-check" />
            {feature}
          </li>
        ))}
        <PriceTag>{plan.price}</PriceTag>
      </ul>
      {!current ? (
        <button onClick={() => fireSwitchCustomerPlan(plan.title)}>
          {plan.buttonText}
        </button>
      ) : current && loading.switchPlan ? (
        <Spinner />
      ) : (
        <></>
      )}
    </HighlighterWrapper>
  );
};

PlanCard.propTypes = {
  plan: PT.shape({
    title: PT.string.isRequired,
    features: PT.arrayOf(PT.string).isRequired,
    price: PT.string.isRequired,
    buttonText: PT.string.isRequired,
  }),
  current: PT.bool.isRequired,
  fireSwitchCustomerPlan: PT.func.isRequired,
};

export default PlanCard;
