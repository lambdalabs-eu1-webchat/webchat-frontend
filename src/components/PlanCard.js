import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styled from 'styled-components';

const HighlighterWrapper = styled.div`
  background-color: ${props => props.highlight};
`;

const PlanCard = ({ plan, current, fireSwitchCustomerPlan }) => {
  return (
    <HighlighterWrapper highlight={current ? 'blanchedalmond' : false}>
      <h2>{plan.title.toUpperCase()}</h2>
      <List>
        {plan.features.map(feature => (
          <ListItem key={feature}>+ {feature}</ListItem>
        ))}
      </List>
      <Button
        disabled={current}
        variant="contained"
        color="primary"
        onClick={() => fireSwitchCustomerPlan(plan.title)}
      >
        {plan.buttonText}
      </Button>
    </HighlighterWrapper>
  );
};

export default PlanCard;
