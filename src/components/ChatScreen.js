import React from 'react';
import proptypes from 'prop-types';
import styled from 'styled-components';

class ChatScreen extends React.Component {
  render() {
    const { tickets } = this.props;
    return <StyledChatScreen>chat</StyledChatScreen>;
  }
}

const StyledChatScreen = styled.div``;

export default ChatScreen;
