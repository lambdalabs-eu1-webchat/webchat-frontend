import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

function ChatScreenHeader({ guest_name, room_name }) {
  return (
    <StyledChatScreenHeader>
      {guest_name} : {room_name}
    </StyledChatScreenHeader>
  );
}

ChatScreenHeader.propTypes = {
  guest_name: propTypes.string.isRequired,
  room_name: propTypes.string.isRequired,
};

const StyledChatScreenHeader = styled.div``;

export default ChatScreenHeader;
