import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const CardDetails = ({ card }) => {
  return (
    <div>
      <List>
        <ListItem>{card.brand}</ListItem>
        <ListItem>xxxx xxxx xxxx {card.last_four}</ListItem>
        <ListItem>
          {card.expiration.month}/{card.expiration.year}
        </ListItem>
      </List>
    </div>
  );
};

export default CardDetails;
