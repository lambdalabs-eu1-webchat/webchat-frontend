import React from 'react';
import PropTypes from 'prop-types';

import TicketView from './TicketView';
import SearchInput from './SearchInput';

const ChatsList = ({ chatsArr, status }) => {
  return (
    <div style={divStyle}>
      <h3>{`${status.toUpperCase()} chats`}</h3>
      <SearchInput status={status} />
      <TicketView chatsArr={chatsArr} status={status} />
    </div>
  );
};

ChatsList.propTypes = {
  chatsArr: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
};

const divStyle = {
  border: '1px solid black',
  margin: '10px',
  padding: '10px',
};

export default ChatsList;
