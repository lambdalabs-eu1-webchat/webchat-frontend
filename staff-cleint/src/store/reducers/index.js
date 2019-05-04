import { combineReducers } from "redux";
import users from './users';
import authToken from './auth';

export default combineReducers({
  users, authToken,
});



