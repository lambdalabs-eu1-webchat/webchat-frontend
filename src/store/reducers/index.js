import { combineReducers } from "redux";
import users from './users';
import authToken from './auth';
import currentUser from './currentUser';

export default combineReducers({
  users, authToken, currentUser
});



