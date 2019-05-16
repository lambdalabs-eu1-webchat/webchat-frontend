import { combineReducers } from 'redux';
import users from './users';
import currentUser from './currentUser';
import chats from './chats';
import hotel from './hotel';
import rooms from './rooms';
import loading from './loading';

const appReducer = combineReducers({
  users,
  chats,
  hotel,
  currentUser,
  rooms,
  loading,
});
const rootReducer = (state, action) => {
  //clears state on logout
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
