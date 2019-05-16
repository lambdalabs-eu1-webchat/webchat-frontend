import {
  LOGIN_REQUEST_STARTED,
  LOGIN_REQUEST_FINISHED,
  REGISTER_USER_STARTED,
  REGISTER_USER_FINISHED,
  UPDATE_HOTEL_STARTED,
  UPDATE_HOTEL_FINISHED,
  FETCH_SINGLE_HOTEL_STARTED,
  FETCH_SINGLE_HOTEL_FINISHED,
} from '../actions/actionTypes';

const loading = (state = false, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_STARTED:
      return true;
    case LOGIN_REQUEST_FINISHED:
      return false;
    case REGISTER_USER_STARTED:
      return true;
    case REGISTER_USER_FINISHED:
      return false;
    case UPDATE_HOTEL_STARTED:
      return true;
    case UPDATE_HOTEL_FINISHED:
      return false;
    case FETCH_SINGLE_HOTEL_STARTED:
      return true;
    case FETCH_SINGLE_HOTEL_FINISHED:
      return false;
    default:
      return state;
  }
};

export default loading;
