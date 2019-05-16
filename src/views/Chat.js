import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ChatScreen from '../components/ChatScreen';
import ChatsList from '../components/chat/ChatsList';
import Tabs from '../components/reusable/Tabs';
import { QUEUED, ACTIVE, CLOSED } from '../utils/ticketStatus';
import { fetchClosedChats } from '../store/actions/chat';
import theme from '../theme/styledTheme';

class Chat extends React.Component {
  state = {
    selectedTab: ACTIVE,
  };
  setSelectedTab = option => {
    if (option === CLOSED) {
      // fetch closed chats
      this.props.fetchClosedChats(this.props.currentUser.hotel_id);
    }
    this.setState({ selectedTab: option });
  };
  render() {
    let chatsArr = [];
    const { selectedTab } = this.state;
    if (selectedTab === ACTIVE) {
      chatsArr = this.props.activeChats;
    } else if (selectedTab === QUEUED) {
      chatsArr = this.props.queuedChats;
    } else if (selectedTab === CLOSED) {
      chatsArr = this.props.closedChats;
    }
    return (
      <StyledChat>
        <ChatListWrapper>
          <Tabs
            options={[QUEUED, ACTIVE, CLOSED]}
            selected={this.state.selectedTab}
            setSelected={this.setSelectedTab}
          />
          <ChatsList
            setSelectedChat={this.setSelectedChat}
            chatsArr={chatsArr}
            status={this.state.selectedTab}
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
  border: 1px solid ${theme.color.accentGreen};
  justify-content: space-around;
  flex-direction: row;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
const ChatListWrapper = styled.div`
  width: 50%;
  background-color: ${theme.color.accentGreen};
  align: center;
  height: 70vh;
  overflow: scroll;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ChatScreenWrapper = styled.div`
  width: 50%;
  height: 70vh;
  /* overflow-y: scroll; */

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
    currentUser: state.currentUser,
  };
};

export default connect(
  mapStateToProps,
  { fetchClosedChats },
)(Chat);
