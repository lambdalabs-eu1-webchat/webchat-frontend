import React from 'react';
import PropTypes from 'prop-types';

import TicketView from './TicketInList';

const ChatsList = ({ queuedChats }) => {
  return (
    <div style={divStyle}>
      <input placeholder="Search queued chats" />
      <TicketView queuedChats={queuedChats} />
    </div>
  );
};

ChatsList.propTypes = {
  queuedChats: PropTypes.array.isRequired,
};

const divStyle = {
  border: '1px solid black',
  margin: '10px',
  padding: '10px',
};

export default ChatsList;
