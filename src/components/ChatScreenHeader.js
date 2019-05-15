import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

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
border:2px solid #c7ccec;
margin-Top:10px;
margin-Bottom:10px;
padding:5px;
background-color:#c7ccec;

`;

export default ChatScreenHeader;

// color: F4F6FF;