import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from '../theme/styledTheme';

function ChatScreenHeader({ guest_name, room_name }) {
  return (
    <StyledChatScreenHeader>
      <p>Guest Name: {guest_name}</p>
      <p>Room: {room_name}</p>
    </StyledChatScreenHeader>
  );
}

ChatScreenHeader.propTypes = {
  guest_name: propTypes.string.isRequired,
  room_name: propTypes.string.isRequired,
};

const StyledChatScreenHeader = styled.div`
  font-size: ${theme.fontSize.message};
  border-radius: 5px;
  padding: 0.5rem 1rem ;
  background: ${theme.color.footerText};
  height: 5vh;
  min-height: 50px;
`;

export default ChatScreenHeader;

// color: F4F6FF;
