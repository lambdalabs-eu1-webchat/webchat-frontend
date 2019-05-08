import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const CardDetailsWrapper = styled.div`
  display: flex;
`;

const CardDetails = ({ card, email, handleModalSwitch }) => {
  return (
    <div>
      <CardDetailsWrapper>
        <ListItem>Card: {card.brand}</ListItem>
        <ListItem>Last 4: {card.last_four}</ListItem>
        <ListItem>
          Exp: {card.expiration.month}/{card.expiration.year}
        </ListItem>
        <ListItem>Receipts: {email}</ListItem>
        <Button variant="contained" color="primary" onClick={handleModalSwitch}>
          New
        </Button>
      </CardDetailsWrapper>
    </div>
  );
};

export default CardDetails;
