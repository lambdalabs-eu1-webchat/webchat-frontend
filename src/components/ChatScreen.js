import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Messages from './Messages';
import ChatScreenHeader from './ChatScreenHeader';
import MessageComposer from './MessageComposer';
import Button from '@material-ui/core/Button';
import { SOCKET } from '../utils/paths';

class ChatScreen extends React.Component {
  closeTicket = () => {
    this.props.socket.emit(SOCKET.CLOSE_TICKET, this.props.chat._id);
  };
  render() {
    const { chat } = this.props;
    return (
      <StyledChatScreen>
        <ChatScreenHeader
          guest_name={chat.guest.name}
          room_name={chat.room.name}
        />
        <Messages tickets={chat.tickets} guest_id={chat.guest.id} />
        <MessageComposer chat_id={chat._id} />
        <Button onClick={this.closeTicket}>Close Ticket</Button>
      </StyledChatScreen>
    );
  }
}
ChatScreen.propTypes = {
  chat: propTypes.shape({
    tickets: propTypes.arrayOf(
      propTypes.shape({
        _id: propTypes.string.isRequired,
        messages: propTypes.arrayOf(
          propTypes.shape({
            _id: propTypes.string.isRequired,
            sender: propTypes.shape({
              id: propTypes.string.isRequired,
              name: propTypes.string.isRequired,
            }).isRequired,
            text: propTypes.string.isRequired,
          }),
        ),
        status: propTypes.string.isRequired,
      }),
    ).isRequired,
    guest: propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    }),
    _id: propTypes.string.isRequired,
  }),
  socket: propTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    socket: state.chats.socket,
  };
}

const StyledChatScreen = styled.div``;

export default connect(
  mapStateToProps,
  {},
)(ChatScreen);
