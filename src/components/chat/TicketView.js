import React from 'react';
import PropTypes from 'prop-types';

const filterTickets = (tickets, filterCond) => {
  return tickets.filter(ticket => ticket.status === filterCond);
};

const TicketView = ({ chatsArr, status }) => {
  return (
    <div>
      {chatsArr &&
        chatsArr.map(chat => {
          return (
            <div style={lineStyle} key={chat._id}>
              <div style={divStyle}>
                <div>Guest Name: {chat.guest.name}</div>
                <div>Room Number: {chat.room.name}</div>
                {filterTickets(chat.tickets, status).map(ticket => {
                  return (
                    <div key={ticket._id}>
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

TicketView.defaultProps = {
  chatsArr: [],
};

TicketView.propTypes = {
  chatsArr: PropTypes.array.isRequired,
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
