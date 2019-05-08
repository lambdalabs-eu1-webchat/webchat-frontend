import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { SOCKET } from '../utils/paths';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class MessageComposer extends React.Component {
  state = {
    inputValue: '',
  };
  handleSend = () => {
    console.log('here');
    debugger;
    this.props.socket.emit(SOCKET.MESSAGE, {
      chat_id: this.props.chat_id,
      text: this.state.inputValue,
    });
    this.setInputValue('');
  };

  handleInput = event => {
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
          className='flex'
        />
        <Button onClick={this.handleSend}>Send</Button>
      </StyledMessageComposer>
    );
  }
}

MessageComposer.propTypes = {
  chat_id: propTypes.string.isRequired,
};
const StyledMessageComposer = styled.div`
  display: flex;
  width: 100%;
  justify-content: stretch;
  .flex {
    flex: 1;
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
