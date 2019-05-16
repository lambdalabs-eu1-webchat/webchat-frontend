import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PT from 'prop-types';
import styled from 'styled-components';

import Spinner from '../components/reusable/Spinner';

const HighlighterWrapper = styled.div`
  background-color: ${props => props.highlight};
  width: 30%;
  padding: 3%;
  border-radius: 2%;
  border: 1px solid lightgrey;
`;

const PlanCard = ({ plan, current, fireSwitchCustomerPlan, loading }) => {
  return (
    <HighlighterWrapper highlight={current ? 'blanchedalmond' : false}>
      <h2>{plan.title.toUpperCase()}</h2>
      <List>
        {plan.features.map(feature => (
          <ListItem key={feature}>+ {feature}</ListItem>
        ))}
        <ListItem>{plan.price}</ListItem>
      </List>
      {!current ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => fireSwitchCustomerPlan(plan.title)}
        >
          {plan.buttonText}
        </Button>
      ) : current  && loading.switchPlan ? (
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
