import React from 'react';
import Button from '@material-ui/core/Button';
import PT from 'prop-types';
import styled from 'styled-components';
import theme from '../theme/styledTheme';

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
`;

const PriceTag = styled.div`
  color: ${theme.color.accentText};
  text-align: center;
  font-size: ${theme.fontSize.s};
  font-weight: bold;
  padding: 5% 0;
`;

const PlanCard = ({ plan, current, fireSwitchCustomerPlan }) => {
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => fireSwitchCustomerPlan(plan.title)}
        >
          {plan.buttonText}
        </Button>
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
