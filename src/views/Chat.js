import React from 'react';
import { connect } from 'react-redux';

import ChatScreen from '../components/ChatScreen';
import ChatsList from '../components/chat/ChatsList';
import { QUEUED, ACTIVE, CLOSED } from '../utils/ticketStatus';

class Chat extends React.Component {
  render() {
    return (
      <div>
        <div>
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
        </div>
        {this.props.currentChat ? (
          <ChatScreen chat={this.props.currentChat} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const chats = state.chats;
  let currentChat = null;
  if (chats.currentChatIdAndStatus) {
    const status = chats.currentChatIdAndStatus.status;
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
  };
};

export default connect(mapStateToProps)(Chat);
