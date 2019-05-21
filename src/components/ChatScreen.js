import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import theme from '../theme/styledTheme';

import Messages from './Messages';
import ChatScreenHeader from './ChatScreenHeader';
import MessageComposer from './MessageComposer';
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
        {chat.typingUser ? <p className="typing">{chat.typingUser.name} is typing...</p> : null}
        {ACTIVE === status ? (
          <React.Fragment>
            <MessageComposer
              chat_id={chat._id}
              last_ticket_id={lastTicket._id}
              language={lastTicket.language}
            />
            <StyledChatButtons>
              <button onClick={this.closeTicket}>Close Ticket</button>
              <button onClick={this.translateMessage}>Translate</button>
            </StyledChatButtons>

          </React.Fragment>
        ) : null}
        {QUEUED === status ? (
          <React.Fragment>
            <StyledJoinButton>
              <button onClick={this.joinChat}>
                Join Chat
              </button>
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
  .typing {
    font-size: ${theme.fontSize.message};
    font-style: italic;
    padding-left: 1rem;
  }
`;

const StyledChatButtons = styled.div`
  button {
    width: 100%;
    height: ${theme.button.smallButton};
    font-size: ${theme.fontSize.xxs};
    border-radius: ${theme.border.radius};
    background: ${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    margin-bottom: 15px;
    box-shadow: ${theme.shadow.buttonShadow};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
      transition: all 0.3s ease;
    }
    &:focus {
      outline: none;
    }
    &:last-child {
     margin: 0;
    }
    @media (max-width: 800px) {
    height: ${theme.button.height};
    font-size: ${theme.fontSize.xs};
    }
  }
`;

const StyledJoinButton = styled.div`
  button {
  margin-top: 1.5rem;
    border-radius: 5px;
    background-color: ${theme.color.accentGreen};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.fontSize.xxs};
    width: 100%;
    align-item: center;
    height: ${theme.button.smallButton};
    text-transform: uppercase;
    @media (max-width: 800px) {
      font-size: ${theme.fontSize.xs};
      height: ${theme.button.height};
    }
  }
`;
export default connect(
  mapStateToProps,
  { setCurrentChatId, updateTicketLanguage, translate },
)(ChatScreen);
