import { combineReducers } from 'redux';
import users from './users';
import authToken from './auth';
import chats from './chats';

export default combineReducers({
  users,
  authToken,
  chats,
});
