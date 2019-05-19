import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import theme from '../theme/styledTheme';

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
import TranslateModal from './TranslateModal';

class ChatScreen extends React.Component {
  state = {
    isTranslateModalOpen: false,
    translatedMessages: [],
  };

  openTranslateModal = () => {
    this.setState({ isTranslateModalOpen: true });
  };

  closeTranslateModal = () => {
    this.setState({ isTranslateModalOpen: false });
  };

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
    this.props.translate(textToTranslate, ticket_id, this.props.chat._id);

    // this.setState({ translatedMessages: translatedText });

    // const firstTranslatedText = translatedText[0];
    // const chat_id = this.props.chat._id;
    // get language from first translated message to state
    // this.props.updateTicketLanguage(
    //   chat_id,
    //   firstTranslatedText.detectedSourceLanguage,
    // );
    // open modal with translated messages
    // this.openTranslateModal();
  };

  render() {
    const { chat, status, currentUser } = this.props;
    const lastTicket = chat.tickets[this.props.chat.tickets.length - 1];

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
          guest={chat.guest}
          chat_id={chat._id}
        />
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
            <StyledJoinButton onClick={this.joinChat}>
              Join Chat
            </StyledJoinButton>
          </React.Fragment>
        ) : null}

        {this.state.isTranslateModalOpen && (
          <TranslateModal
            translations={this.state.translatedMessages}
            isTranslateModalOpen={this.state.isTranslateModalOpen}
            closeTranslateModal={this.closeTranslateModal}
          />
        )}
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

const StyledChatScreen = styled.div`
  font-size: ${theme.fontSize.xxxs};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: ${theme.color.white};
`;

const StyledJoinButton = styled.button`
  margin: 2rem;
  border-radius: 0.5rem;
  background-color: ${theme.color.accentGreen};
  color: ${theme.color.white};
  font-weight: ${theme.fontWeight.bolder};
  width: 95%;
  align-item: center;
  padding: 1.5rem;
`;
export default connect(
  mapStateToProps,
  { setCurrentChatId, updateTicketLanguage, translate },
)(ChatScreen);
