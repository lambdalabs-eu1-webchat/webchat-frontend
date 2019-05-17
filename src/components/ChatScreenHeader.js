import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from '../theme/styledTheme';

function ChatScreenHeader({ guest_name, room_name }) {
  return (
    <StyledChatScreenHeader>
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
  border: 2px solid ${theme.color.footerText};
  padding: 0.3125rem;
  background-color: ${theme.color.footerText};
  height: 5vh;
  min-height: 40px;
`;

export default ChatScreenHeader;

// color: F4F6FF;
