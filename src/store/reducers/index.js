import { combineReducers } from 'redux';
import users from './users';
import currentUser from './currentUser';
import chats from './chats';
import rooms from './rooms';
import hotel from './hotel';
import rooms from './rooms';

export default combineReducers({
  users,
  chats,
  hotel,
  currentUser,
  rooms,
});
