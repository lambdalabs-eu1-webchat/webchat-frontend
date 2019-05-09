import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllUsers } from './store/actions/users';
import socketIOClient from 'socket.io-client';
import { loginRequest, registerUser, logout } from './store/actions/auth';
import { DOMAIN, SOCKET } from './utils/paths';
import {
  addActiveChats,
  addQueuedChats,
  addMessage,
  addQueuedChat,
  removeQueuedChat,
  fetchClosedChats,
  saveSocket,
} from './store/actions/chat';

import NavBar from './components/NavBar';
import Router from './components/Router';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  state = {
    socketInit: true,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token && this.state.socketInit) {
      this.setState({ socketInit: false });
      const socket = socketIOClient(DOMAIN);
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
        // socket.on(SOCKET.CHATLOG, chatLog => {});
        socket.emit(SOCKET.LOGIN, token);
      });
      // temp hotel_id
      this.props.dispatchfetchClosedChats('5cc74ab1f16ec37bc8cc4cdb');
    }
  }

  componentDidUpdate() {
    const token = localStorage.getItem('token');
    if (token && this.state.socketInit) {
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
        // socket.on(SOCKET.CHATLOG, chatLog => {});
        socket.emit(SOCKET.LOGIN, token);
      });
      // temp hotel_id
      this.props.dispatchfetchClosedChats('5cc74ab1f16ec37bc8cc4cdb');
    }
  }

  render() {
    const {
      state,
      dispatchLoginRequest,
      dispatchRegisterUser,
      dispatchFetchAllUsers,
      dispatchLogout,
    } = this.props;
    console.log(this.props.currentUser);
    return (
      <div className='App'>
        <NavBar />
        <Router user_type={this.props.currentUser.user_type} />
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape().isRequired,
  dispatchLoginRequest: PropTypes.func.isRequired,
  dispatchRegisterUser: PropTypes.func.isRequired,
  dispatchLogout: PropTypes.func.isRequired,
  dispatchSaveSocket: PropTypes.func.isRequired,
  dispatchAddActiveChats: PropTypes.func.isRequired,
  dispatchAddQueuedChats: PropTypes.func.isRequired,
  dispatchAddMessage: PropTypes.func.isRequired,
  dispatchAddQueuedChat: PropTypes.func.isRequired,
  dispatchRemoveQueuedChat: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ currentUser: state.currentUser });

export default withRouter(
  connect(
    mapStateToProps,
    {
      dispatchLoginRequest: loginRequest,
      dispatchRegisterUser: registerUser,
      dispatchFetchAllUsers: fetchAllUsers,
      dispatchLogout: logout,
      dispatchAddActiveChats: addActiveChats,
      dispatchAddQueuedChats: addQueuedChats,
      dispatchAddMessage: addMessage,
      dispatchAddQueuedChat: addQueuedChat,
      dispatchRemoveQueuedChat: removeQueuedChat,
      dispatchfetchClosedChats: fetchClosedChats,
      dispatchSaveSocket: saveSocket,
    },
  )(App),
);
