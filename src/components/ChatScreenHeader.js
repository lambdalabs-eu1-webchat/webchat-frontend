import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from '../theme/styledTheme'

function ChatScreenHeader({ guest_name, room_name }) {
  return (
    <StyledChatScreenHeader>
      <h1>Current Chat</h1> <br></br>
      <p>Guest Name:{guest_name}</p>
      <p>Room: {room_name}</p>
    </StyledChatScreenHeader>
  );
}

ChatScreenHeader.propTypes = {
  guest_name: propTypes.string.isRequired,
  room_name: propTypes.string.isRequired,
};

const StyledChatScreenHeader = styled.div`
margin: 2rem;
border:2px solid ${theme.color.footerText};
margin-Top:0.625rem;
margin-Bottom:0.625rem;
padding:0.3125rem;
background-color:${theme.color.footerText};

`;

export default ChatScreenHeader;

// color: F4F6FF;