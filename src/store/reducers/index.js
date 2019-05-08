import { combineReducers } from 'redux';
import users from './users';
import authToken from './auth';
import currentUser from './currentUser';
import chats from './chats';
import rooms from './rooms';

export default combineReducers({
  users,
  authToken,
  chats,
  currentUser,
  rooms,
});
