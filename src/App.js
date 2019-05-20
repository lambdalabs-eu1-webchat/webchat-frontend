import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { DOMAIN, SOCKET } from './utils/paths';
import {
  addActiveChats,
  addQueuedChats,
  addMessage,
  addQueuedChat,
  removeQueuedChat,
  fetchClosedChats,
  saveSocket,
  addQueueMessage,
  addCurrentTyper,
  clearCurrentTyper,
} from './store/actions/chat';

import NavBar from './components/layout/navbar/NavBar';
import Router from './components/Router';
import Footer from './components/layout/Footer';
import './App.css';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token && !this.props.socket) {
      this.setState({ socketInit: false });
      const socket = socketIOClient(DOMAIN);
      this.props.dispatchSaveSocket(socket);
      socket.on(SOCKET.CONNECTION, () => {
        // set up listeners
        socket.on(SOCKET.MESSAGE, ({ chat_id, message }) => {
          this.props.dispatchAddMessage(chat_id, message);
        });
        socket.on(SOCKET.ACTIVE_CHATS, chatLogs => {
          this.props.dispatchAddActiveChats(chatLogs);
        });
        socket.on(SOCKET.QUEUED_CHATS, chatLogs => {
          this.props.dispatchAddQueuedChats(chatLogs);
        });
        socket.on(SOCKET.ADD_QUEUED, chatLog => {
          this.props.dispatchAddQueuedChat(chatLog);
        });
        socket.on(SOCKET.REMOVE_QUEUED, chat_id => {
          this.props.dispatchRemoveQueuedChat(chat_id);
        });
        socket.on(SOCKET.QUEUED_MESSAGE, ({ message, chat_id }) => {
          this.props.dispatchAddQueueMessage({ message, chat_id });
        });
        socket.on(SOCKET.TYPING, ({ user, chat_id }) => {
          if (user._id !== this.props.currentUser._id) {
            this.props.dispatchAddCurrentTyper({ chat_id, user });
          }
        });
        socket.on(SOCKET.STOPPED_TYPING, ({ user, chat_id }) => {
          if (user._id !== this.props.currentUser._id) {
            this.props.dispatchClearCurrentTyper(chat_id);
          }
        });
        // socket.on(SOCKET.CHATLOG, chatLog => {});
        socket.emit(SOCKET.LOGIN, token);
      });
    }
  }

  componentDidUpdate() {
    const token = localStorage.getItem('token');
    if (token && !this.props.socket) {
      this.setState({ socketInit: false });
      const socket = socketIOClient(DOMAIN);
      this.props.dispatchSaveSocket(socket);
      socket.on(SOCKET.CONNECTION, () => {
        // set up listeners
        socket.on(SOCKET.MESSAGE, ({ chat_id, message }) => {
          this.props.dispatchAddMessage(chat_id, message);
        });
        socket.on(SOCKET.ACTIVE_CHATS, chatLogs => {
          this.props.dispatchAddActiveChats(chatLogs);
        });
        socket.on(SOCKET.QUEUED_CHATS, chatLogs => {
          this.props.dispatchAddQueuedChats(chatLogs);
        });
        socket.on(SOCKET.ADD_QUEUED, chatLog => {
          this.props.dispatchAddQueuedChat(chatLog);
        });
        socket.on(SOCKET.REMOVE_QUEUED, chat_id => {
          this.props.dispatchRemoveQueuedChat(chat_id);
        });
        socket.on(SOCKET.QUEUED_MESSAGE, ({ message, chat_id }) => {
          this.props.dispatchAddQueueMessage({ message, chat_id });
        });
        socket.on(SOCKET.TYPING, ({ user, chat_id }) => {
          if (user._id !== this.props.currentUser._id) {
            this.props.dispatchAddCurrentTyper({
              chat_id,
              user,
            });
          }
        });
        socket.on(SOCKET.STOPPED_TYPING, ({ user, chat_id }) => {
          if (user._id !== this.props.currentUser._id) {
            this.props.dispatchClearCurrentTyper(chat_id);
          }
        });
        // socket.on(SOCKET.CHATLOG, chatLog => {});
        socket.emit(SOCKET.LOGIN, token);
      });
    }
  }

  render() {
    return (
      <AppWrapper>
        <NavBar currentUser={this.props.currentUser} />
        <Router user_type={this.props.currentUser.user_type} />
        <Footer />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object.isRequired,
  dispatchSaveSocket: PropTypes.func.isRequired,
  dispatchAddActiveChats: PropTypes.func.isRequired,
  dispatchAddQueuedChats: PropTypes.func.isRequired,
  dispatchAddMessage: PropTypes.func.isRequired,
  dispatchAddQueuedChat: PropTypes.func.isRequired,
  dispatchRemoveQueuedChat: PropTypes.func.isRequired,
  dispatchAddQueueMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  socket: state.chats.socket,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      dispatchAddActiveChats: addActiveChats,
      dispatchAddQueuedChats: addQueuedChats,
      dispatchAddMessage: addMessage,
      dispatchAddQueuedChat: addQueuedChat,
      dispatchRemoveQueuedChat: removeQueuedChat,
      dispatchfetchClosedChats: fetchClosedChats,
      dispatchSaveSocket: saveSocket,
      dispatchAddQueueMessage: addQueueMessage,
      dispatchAddCurrentTyper: addCurrentTyper,
      dispatchClearCurrentTyper: clearCurrentTyper,
    },
  )(App),
);

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
