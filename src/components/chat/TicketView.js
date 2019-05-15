import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentChatId } from '../../store/actions/chat';
import { SOCKET } from '../../utils/paths';
const filterTickets = (tickets, filterCond) => {
  return tickets.filter(ticket => ticket.status === filterCond);
};

const TicketView = ({
  chatsArr,
  status,
  setCurrentChatId,
  socket,
  currentChatId,
}) => {
  const handleChatSelect = chat_id => {
    // need to stop typing in current chat
    socket.emit(SOCKET.STOPPED_TYPING, currentChatId);
    // switch chats
    setCurrentChatId(chat_id, status);
  };
  return (
    <div>
      {chatsArr &&
        chatsArr.map(chat => {
          return (
            <div
              onClick={() => handleChatSelect(chat._id)}
              style={lineStyle}
              key={chat._id}
            >
              <div style={divStyle}>
                <div style={name}>Guest Name: {chat.guest.name}</div>
                <div style={name}>Room Number: {chat.room.name}</div>
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
  setCurrentChatId: PropTypes.func.isRequired,
};

const divStyle = {
  backgroundColor:'pink',
  margin: '10px',
  padding: '10px',
  width: '100%',
  borderRadius:'10px',
  color:'white',
  fontWeight:'light',
  fontSize:'13px',

};
const name = {
fontWeight:'bolder',
color:'white',
};

const lineStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};
function mapStateToProps(state) {
  return {
    socket: state.chats.socket,
    currentChatId: state.chats.currentChatIdAndStatus
      ? state.chats.currentChatIdAndStatus.chat_id
      : null,
  };
}

export default connect(
  mapStateToProps,
  { setCurrentChatId },
)(TicketView);
