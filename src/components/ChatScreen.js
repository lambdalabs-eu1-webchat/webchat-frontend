import React from 'react';
import proptypes from 'prop-types';
import styled from 'styled-components';
import Messages from './Messages';
import ChatScreenHeader from './ChatScreenHeader';
import MessageComposer from './MessageComposer';
class ChatScreen extends React.Component {
  render() {
    const { chat } = this.props;
    return (
      <StyledChatScreen>
        <ChatScreenHeader
          guest_name={chat.guest.name}
          room_name={chat.room.name}
        />
        <Messages tickets={chat.tickets} guest_id={chat.guest.id} />
        <MessageComposer />
      </StyledChatScreen>
    );
  }
}

const StyledChatScreen = styled.div``;

export default ChatScreen;
