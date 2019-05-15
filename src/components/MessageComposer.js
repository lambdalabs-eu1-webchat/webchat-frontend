import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { SOCKET } from '../utils/paths';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { translate } from '../store/actions/chat';

class MessageComposer extends React.Component {
  state = {
    inputValue: '',
  };
  handleSend = () => {
    const { socket, chat_id } = this.props;
    socket.emit(SOCKET.MESSAGE, {
      chat_id: this.props.chat_id,
      text: this.state.inputValue,
    });
    socket.emit(SOCKET.STOPPED_TYPING, chat_id);
    this.setInputValue('');
  };

  translateSend = async () => {
    try {
      const { socket, chat_id, last_ticket_id, language } = this.props;

      // translate hotel staff message based on language from guest message
      const translatedInputValue = await translate(
        this.state.inputValue,
        last_ticket_id,
        language
      );

      socket.emit(SOCKET.MESSAGE, {
        chat_id: this.props.chat_id,
        // emit the translated message to chat
        text: translatedInputValue,
      });
      socket.emit(SOCKET.STOPPED_TYPING, chat_id);
      this.setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  handleInput = event => {
    const value = event.target.value;
    const { socket, chat_id } = this.props;
    // if not typing
    if (value.length === 0) {
      socket.emit(SOCKET.STOPPED_TYPING, chat_id);
      // if typing
    } else if (value.length > 0) {
      socket.emit(SOCKET.TYPING, chat_id);
    }
    this.setInputValue(event.target.value);
  };
  setInputValue = value => {
    this.setState({ inputValue: value });
  };
  render() {
    return (
      <StyledMessageComposer>
        <Input
          value={this.state.inputValue}
          onChange={this.handleInput}
          className="flex"
        />
        <Button onClick={this.handleSend}>
        <span style={col} className="fas fa-paper-plane"></span>
        </Button>
        <Button onClick={() => this.translateSend()}>Translate & Send</Button>
      </StyledMessageComposer>
    );
  }
}

MessageComposer.propTypes = {
  chat_id: propTypes.string.isRequired,
  socket: propTypes.object.isRequired,
  last_ticket_id: propTypes.string.isRequired,
  language: propTypes.string.isRequired,
};

const StyledMessageComposer = styled.div`
  display: flex;
  width: 100%;
  justify-content: stretch;
  .flex {
    flex: 1;
  }
`;
const col= {
  color:'#c7ccec',
};
// need to get the socket here to emit connect props

const mapStateToProps = state => {
  return {
    socket: state.chats.socket,
  };
};

export default connect(
  mapStateToProps,
  {}
)(MessageComposer);
