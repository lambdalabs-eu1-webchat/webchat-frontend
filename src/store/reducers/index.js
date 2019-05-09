import { combineReducers } from 'redux';
import users from './users';
import authToken from './auth';
import currentUser from './currentUser';
import chats from './chats';
import hotel from './hotel';

export default combineReducers({
  users,
  authToken,
  chats,
  hotel,
  currentUser,
  hotel,
});
