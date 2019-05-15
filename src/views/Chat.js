import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ChatScreen from '../components/ChatScreen';
import ChatsList from '../components/chat/ChatsList';
import { QUEUED, ACTIVE, CLOSED } from '../utils/ticketStatus';
import { fetchClosedChats } from '../store/actions/chat';

class Chat extends React.Component {
  render() {
    return (
      <StyledChat>
        <ChatListWrapper>
          <h2>Welcome to the Chat page!</h2>
          <ChatsList
            setSelectedChat={this.setSelectedChat}
            chatsArr={this.props.queuedChats}
            status={QUEUED}
          />
          <ChatsList
            setSelectedChat={this.setSelectedChat}
            chatsArr={this.props.activeChats}
            status={ACTIVE}
          />
          <ChatsList
            setSelectedChat={this.setSelectedChat}
            chatsArr={this.props.closedChats}
            status={CLOSED}
          />
        </ChatListWrapper>
        <ChatScreenWrapper>
          {this.props.currentChat ? (
            <ChatScreen
              status={this.props.status}
              chat={this.props.currentChat}
            />
          ) : null}
        </ChatScreenWrapper>
      </StyledChat>
    );
  }
}

const StyledChat = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const ChatListWrapper = styled.div`
  width: 50%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ChatScreenWrapper = styled.div`
  width: 50%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const mapStateToProps = state => {
  const chats = state.chats;
  let currentChat = null;
  let status = null;
  if (chats.currentChatIdAndStatus) {
    status = chats.currentChatIdAndStatus.status;
    const chat_id = chats.currentChatIdAndStatus.chat_id;
    if (ACTIVE === status) {
      currentChat = chats.activeChats.find(chat => chat._id === chat_id);
    } else if (QUEUED === status) {
      currentChat = chats.queuedChats.find(chat => chat._id === chat_id);
    } else if (CLOSED === status) {
      currentChat = chats.closedChats.find(chat => chat._id === chat_id);
    }
  }
  return {
    queuedChats: chats.queuedChats,
    activeChats: chats.activeChats,
    closedChats: chats.closedChats,
    currentChat,
    status,
  };
};

export default connect(
  mapStateToProps,
  { fetchClosedChats }
)(Chat);

