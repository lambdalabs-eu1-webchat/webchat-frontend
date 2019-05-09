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
          <ChatScreen chat={this.state.currentChat} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    queuedChats: state.chats.queuedChats,
    activeChats: state.chats.activeChats,
    closedChats: state.chats.closedChats,
  };
};

export default connect(mapStateToProps)(Chat);
