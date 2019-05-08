import React from 'react';
import { connect } from 'react-redux';
import ChatsList from '../components/ChatsList';

class Chat extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome to the Chat page!</h2>
        <ChatsList chatsArr={this.props.queuedChats} status="queued" />
        <ChatsList chatsArr={this.props.activeChats} status="active" />
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
