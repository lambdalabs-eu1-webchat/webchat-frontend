import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Messages from './Messages';
import ChatScreenHeader from './ChatScreenHeader';
import MessageComposer from './MessageComposer';
import Button from '@material-ui/core/Button';
import { SOCKET } from '../utils/paths';
import { ACTIVE, QUEUED } from '../utils/ticketStatus';
import {
  setCurrentChatId,
  translate,
  updateTicketLanguage,
} from '../store/actions/chat';
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

  translateMessage = async () => {
    // get last ticket in current active chat
    const lastTicket = this.props.chat.tickets[
      this.props.chat.tickets.length - 1
    ];

    const ticket_id = lastTicket._id;

    // take out all messages from last ticket
    const textToTranslate = lastTicket.messages.map(msg => {
      return msg.text;
    });
    // translate message from guest
    const translatedText = await translate(textToTranslate, ticket_id);
    const lastTranslatedText = translatedText[translatedText.length - 1];

    const chat_id = this.props.chat._id;
    // get language from last translated message to state
    this.props.updateTicketLanguage(chat_id, lastTranslatedText.inputLang);
  };

  render() {
    const { chat, status } = this.props;
    const lastTicket = chat.tickets[this.props.chat.tickets.length - 1];
    console.log('render chatscreen: ', lastTicket.language);
    return (
      <StyledChatScreen>
        <ChatScreenHeader
          guest_name={chat.guest.name}
          room_name={chat.room.name}
        />
        <Messages tickets={chat.tickets} guest_id={chat.guest.id} />
        {chat.typingUser ? <p>{chat.typingUser.name} is typing</p> : null}
        {ACTIVE === status ? (
          <React.Fragment>
            <MessageComposer
              chat_id={chat._id}
              last_ticket_id={lastTicket._id}
              language={lastTicket.language}
            />
            <Button onClick={this.closeTicket}>Close Ticket</Button>
            <Button onClick={this.translateMessage}>Translate</Button>
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
          })
        ),
        status: propTypes.string.isRequired,
      })
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
  };
}

const StyledChatScreen = styled.div``;

export default connect(
  mapStateToProps,
  { setCurrentChatId, updateTicketLanguage }
)(ChatScreen);
