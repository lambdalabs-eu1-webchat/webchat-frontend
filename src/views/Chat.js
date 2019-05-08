import React from 'react';
import { connect } from 'react-redux';
import ChatsList from '../components/ChatsList';

class Chat extends React.Component {
  render() {
    console.log('props:', this.props);
    return (
      <div>
        <h2>Welcome to the Chat page!</h2>
        <ChatsList queuedChats={this.props.queuedChats} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state: ', state);
  return {
    queuedChats: state.chats.queuedChats,
  };
};

export default connect(mapStateToProps)(Chat);
