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

import NavBar from './components/layout/navbar/NavBar';
import Logout from './components/Logout';
import Footer from './components/layout/Footer'
import HomePage from './views/HomePage';
import Chat from './views/Chat';
import Login from './views/Login';
import Register from './views/Register';
import Billing from './views/Billing';
import TeamMembers from './views/TeamMembers';
import CompanySettings from "./views/CompanySettings";
import EmployeeSettings from './views/EmployeeSettings';
import CheckInOrOut from './views/CheckInOrOut';
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

    const isLoggedIn = Boolean(state.currentUser.token);

    return (
      <div className="App">
        <NavBar currentUser={state.currentUser} />
        <Route
          exact
          path='/'
          render={props => (
            <HomePage
              {...props}
              loggedIn={isLoggedIn}
              fetchAllUsers={dispatchFetchAllUsers}
            />
          )}
        />
        <Route
          path='/login'
          render={props => (
            <Login
              {...props}
              loggedIn={isLoggedIn}
              loginRequest={dispatchLoginRequest}
            />
          )}
        />
        <Route
          path='/register'
          render={props => (
            <Register
              {...props}
              loggedIn={isLoggedIn}
              registerUser={dispatchRegisterUser}
            />
          )}
        />
        <Route
          exact
          path='/chat'
          render={props => (
            <Chat {...props} loggedIn={isLoggedIn} />
          )}
        />

        <Route
          path='/logout'
          render={props => (
            <Logout
              {...props}
              loggedIn={isLoggedIn}
              logout={dispatchLogout}
            />
          )}
        />
      
        <Route
          path='/logout'
          render={props => (
            <Logout
              {...props}
              loggedIn={isLoggedIn}
              logout={dispatchLogout}
            />
          )}
        />

        <Route
          path="/team-members"
          render={props => (
            <TeamMembers
                {...props}
                loggedIn={isLoggedIn}
            />
          )}
        />
        <Route
          path="/company-settings"
          render={props => (
              <CompanySettings
                  {...props}
                  loggedIn={isLoggedIn}
              />
            )}
        />
          
        <Route
          path='/checkin'
          render={props => (
            <CheckInOrOut {...props} loggedIn={isLoggedIn} />
          )}
        />
        <Route
          path='/billing'
          render={props => (
            <Billing {...props} loggedIn={isLoggedIn} />
          )}
        />

  
        <Route
          path="/employee-settings"
          render={props => (
            <EmployeeSettings {...props} loggedIn={Boolean(state.authToken)} />
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
      dispatchfetchClosedChats: fetchClosedChats,
      dispatchSaveSocket: saveSocket,
    },
  )(App),
);
