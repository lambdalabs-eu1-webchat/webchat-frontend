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
  saveSocket,
} from './store/actions/chat';

import NavBar from './components/layout/navbar/NavBar';
import Logout from './components/logout/Logout';
import Footer from './components/layout/Footer'
import HomePage from './views/HomePage';
import Chat from './views/Chat';
import Login from './views/Login';
import Register from './views/Register';
import Billing from './views/Billing';
import TeamMembers from './views/TeamMembers';
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

    return (
      <div className="App">
        <NavBar loggedIn={Boolean(state.authToken)} />
        <Route
          exact
          path="/"
          render={props => (
            <HomePage
              {...props}
              loggedIn={Boolean(state.authToken)}
              fetchAllUsers={dispatchFetchAllUsers}
            />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <Login
              {...props}
              loggedIn={Boolean(state.authToken)}
              loginRequest={dispatchLoginRequest}
            />
          )}
        />
        <Route
          path="/register"
          render={props => (
            <Register
              {...props}
              loggedIn={Boolean(state.authToken)}
              registerUser={dispatchRegisterUser}
            />
          )}
        />
        <Route
          exact
          path="/chat"
          render={props => (
            <Chat {...props} loggedIn={Boolean(state.authToken)} />
          )}
        />

        <Route
          path="/logout"
          render={props => (
            <Logout
              {...props}
              loggedIn={Boolean(state.authToken)}
              logout={dispatchLogout}
            />
          )}
        />
      
        <Route
          path="/logout"
          render={props => (
            <Logout
              {...props}
              loggedIn={Boolean(state.authToken)}
              logout={dispatchLogout}
            />
          )}
        />

        <Route
          path="/billing"
          render={props => (
            <Billing {...props} loggedIn={Boolean(state.authToken)} />
          )}
        />

        <Route
          path="/team-members"
          render={props => (
            <TeamMembers {...props} loggedIn={Boolean(state.authToken)} />
          )}
        />

     <Footer />
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

const mapStateToProps = state => ({ state });

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
      dispatchSaveSocket: saveSocket,
    },
  )(App),
);
