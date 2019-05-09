import { combineReducers } from 'redux';
import users from './users';
import currentUser from './currentUser';
import chats from './chats';
import hotel from './hotel';
import rooms from './rooms';

export default combineReducers({
  users,
  chats,
  hotel,
  currentUser,
});
