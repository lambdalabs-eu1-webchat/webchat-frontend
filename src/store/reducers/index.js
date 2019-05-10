import { combineReducers } from 'redux';
import users from './users';
import currentUser from './currentUser';
import chats from './chats';
import hotel from './hotel';
import rooms from './rooms';

const appReducer = combineReducers({
  users,
  chats,
  hotel,
  currentUser,
  rooms,
});
const rootReducer = (state, action) => {
  //clears state on logout
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
