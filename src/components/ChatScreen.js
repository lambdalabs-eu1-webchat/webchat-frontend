import React from 'react';
import proptypes from 'prop-types';
import styled from 'styled-components';
import Messages from './Messages';

class ChatScreen extends React.Component {
  render() {
    const { chat } = this.props;
    return (
      <StyledChatScreen>
        <Messages tickets={chat.tickets} guest_id={chat.guest.id} />
      </StyledChatScreen>
    );
  }
}

const StyledChatScreen = styled.div``;

export default ChatScreen;
