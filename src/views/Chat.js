import React from 'react';
import { connect } from 'react-redux';

import ChatsList from '../components/ChatsList';
import { QUEUED, ACTIVE, CLOSED } from '../utils/ticketStatus';

class Chat extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome to the Chat page!</h2>
        <ChatsList chatsArr={this.props.queuedChats} status={QUEUED} />
        <ChatsList chatsArr={this.props.activeChats} status={ACTIVE} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    queuedChats: state.chats.queuedChats,
    activeChats: state.chats.activeChats,
  };
};

export default connect(mapStateToProps)(Chat);
