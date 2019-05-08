import React from 'react';
import PropTypes from 'prop-types';

const TicketView = ({ queuedChats }) => {
  return (
    <div>
      {queuedChats.map(chat => {
        return (
          <div style={lineStyle}>
            <div style={divStyle}>
              <div>Guest Name: {chat.guest.name}</div>
              <div>Room Number: {chat.room.name}</div>
              {chat.tickets.map(ticket => {
                return (
                  <div>
                    <div>
                      Last message:
                      {ticket.messages[ticket.messages.length - 1].text}
                    </div>
                  </div>
                );
              })}
            </div>
            <span>Icon here</span>
          </div>
        );
      })}
    </div>
  );
};

TicketView.propTypes = {
  queuedChats: PropTypes.array.isRequired,
};

const divStyle = {
  border: '1px solid black',
  margin: '10px',
  padding: '10px',
  width: '100%',
};

const lineStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

export default TicketView;
