import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import styled from 'styled-components';

const CardDetailsWrapper = styled.div`
  display: flex;
  width: 1000px;
`;

const CardDetails = ({ card, email }) => {
  return (
    <div>
      <CardDetailsWrapper>
        <ListItem>{card.brand}</ListItem>
        <ListItem>xxxx xxxx xxxx {card.last_four}</ListItem>
        <ListItem>
          Exp: {card.expiration.month}/{card.expiration.year}
        </ListItem>
        <ListItem>{email}</ListItem>
      </CardDetailsWrapper>
    </div>
  );
};

export default CardDetails;
