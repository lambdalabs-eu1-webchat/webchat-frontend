import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { SOCKET } from '../utils/paths';
import { translate } from '../store/actions/chat';
import theme from '../theme/styledTheme';

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
  handleEnter = event => {
    if ('Enter' === event.key) this.handleSend();
  };
  translateSend = async () => {
    try {
      const { socket, chat_id, last_ticket_id, language } = this.props;

      // translate hotel staff message based on language from guest message
      const translatedInputValue = await translate(
        this.state.inputValue,
        last_ticket_id,
        language,
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
        <input
          value={this.state.inputValue}
          onChange={this.handleInput}
          className="flex"
          onKeyPress={this.handleEnter}
        />
        <StyledMessageComposerSendButton onClick={this.handleSend}>
          <span className="fas fa-paper-plane" />
        </StyledMessageComposerSendButton>
        <button
          className="translate-and-send"
          onClick={() => this.translateSend()}
        >
          Translate & Send
        </button>
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
  align-items: center;
  .flex {
    flex: 1;
  }
  input {
    border: none;
    border-bottom: 1px solid ${theme.color.footerText};
    margin-bottom: 20px;
    height: ${theme.input.height};
    font-size: ${theme.fontSize.message};
    padding: 20px 0;
    border-radius: 0;
    &:focus {
      outline: none;
    }
  }

  .translate-and-send {
    border: none;
    border-radius: 5px;
    background: ${theme.color.accentPurple};
    color: ${theme.color.white};
    font-weight: bold;
    font-size: ${theme.fontSize.xxs};
    height: ${theme.button.smallButton};
    text-transform: uppercase;

    &:focus {
      outline: none;
    }

    &:hover {
      cursor: pointer;
      box-shadow: ${theme.shadow.buttonHover};
      transition: all 0.3s ease;
    }
  }
`;
const StyledMessageComposerSendButton = styled.button`
  border: none;
  background: none;
  &:focus {
    outline: none;
  }

  button {
    border: none;
    background: none;
    text-transform: uppercase;
    &:focus {
      outline: none;
    }
  }

  .fa-paper-plane {
    background: none;
    background: transparent;
    color: ${theme.color.accentGreen};
    font-size: ${theme.fontSize.m};
    cursor: pointer;
    &:hover {
      color: ${theme.color.accentPurple};
      transition: all 0.3s ease;
    }
  }
`;

// need to get the socket here to emit connect props

const mapStateToProps = state => {
  return {
    socket: state.chats.socket,
  };
};

export default connect(
  mapStateToProps,
  {},
)(MessageComposer);
