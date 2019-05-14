import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Messages from './Messages';
import ChatScreenHeader from './ChatScreenHeader';
import MessageComposer from './MessageComposer';
import Button from '@material-ui/core/Button';
import { SOCKET } from '../utils/paths';
import { ACTIVE, CLOSED, QUEUED } from '../utils/ticketStatus';
import { setCurrentChatId } from '../store/actions/chat';
class ChatScreen extends React.Component {
  closeTicket = () => {
    const chat_id = this.props.chat._id;
    this.props.socket.emit(SOCKET.STOPPED_TYPING, chat_id);

    this.props.socket.emit(SOCKET.CLOSE_TICKET, chat_id);
  };
  joinChat = () => {
    const chat_id = this.props.chat._id;
    this.props.socket.emit(SOCKET.STOPPED_TYPING, chat_id);
    this.props.socket.emit(SOCKET.ASSIGN_SELF_TICKET, chat_id);
    this.props.setCurrentChatId(chat_id, ACTIVE);
  };
  render() {
    const { chat, status, currentUser } = this.props;
    return (
      <StyledChatScreen>
        <ChatScreenHeader
          guest_name={chat.guest.name}
          room_name={chat.room.name}
        />
        <Messages
          userType={currentUser.user_type}
          status={status}
          tickets={chat.tickets}
          guest_id={chat.guest.id}
        />
        {chat.typingUser ? <p>{chat.typingUser.name} is typing</p> : null}
        {ACTIVE === status ? (
          <React.Fragment>
            <MessageComposer chat_id={chat._id} />
            <Button onClick={this.closeTicket}>Close Ticket</Button>
          </React.Fragment>
        ) : null}
        {QUEUED === status ? (
          <React.Fragment>
            <Button onClick={this.joinChat}>Join Chat</Button>
          </React.Fragment>
        ) : null}
      </StyledChatScreen>
    );
  }
}
ChatScreen.propTypes = {
  chat: propTypes.shape({
    tickets: propTypes.arrayOf(
      propTypes.shape({
        _id: propTypes.string.isRequired,
        messages: propTypes.arrayOf(
          propTypes.shape({
            _id: propTypes.string.isRequired,
            sender: propTypes.shape({
              id: propTypes.string.isRequired,
              name: propTypes.string.isRequired,
            }).isRequired,
            text: propTypes.string.isRequired,
          }),
        ),
        status: propTypes.string.isRequired,
      }),
    ).isRequired,
    guest: propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    }),
    _id: propTypes.string.isRequired,
  }),
  socket: propTypes.object.isRequired,
  status: propTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    socket: state.chats.socket,
    currentUser: state.currentUser,
  };
}

const StyledChatScreen = styled.div``;

export default connect(
  mapStateToProps,
  { setCurrentChatId },
)(ChatScreen);
