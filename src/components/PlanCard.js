import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const PlanCard = ({ plan, current }) => {
  return (
    <div>
      <h2>
        {plan.title} {current}
      </h2>
      <List>
        {plan.features.map(feature => (
          <ListItem key={feature}>+ {feature}</ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary">
        {plan.buttonText}
      </Button>
    </div>
  );
};

export default PlanCard;
