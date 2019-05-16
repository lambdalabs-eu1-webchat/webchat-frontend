import {
  LOGIN_REQUEST_STARTED,
  LOGIN_REQUEST_FINISHED,
  REGISTER_USER_STARTED,
  REGISTER_USER_FINISHED,
  UPDATE_HOTEL_STARTED,
  UPDATE_HOTEL_FINISHED,
  FETCH_SINGLE_HOTEL_STARTED,
  FETCH_SINGLE_HOTEL_FINISHED,
  ROOMS,
  SUBSCRIPTIONS,
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
    case ROOMS.FETCH_ROOMS_FOR_HOTEL_STARTED:
      return true;
    case ROOMS.FETCH_ROOMS_FOR_HOTEL_FINISHED:
      return false;
    case ROOMS.UPDATE_ROOM_FOR_HOTEL_STARTED:
      return true;
    case ROOMS.UPDATE_ROOM_FOR_HOTEL_FINISHED:
      return false;
    case ROOMS.DELETE_ROOM_FOR_HOTEL_STARTED:
      return true;
    case ROOMS.DELETE_ROOM_FOR_HOTEL_FINISHED:
      return false;
    case ROOMS.CREATE_ROOM_FOR_HOTEL_STARTED:
      return true;
    case ROOMS.CREATE_ROOM_FOR_HOTEL_FINISHED:
      return false;
    case SUBSCRIPTIONS.CREATE_NEW_CUSTOMER_STARTED:
      return true;
    case SUBSCRIPTIONS.CREATE_NEW_CUSTOMER_FINISHED:
      return false;
    case SUBSCRIPTIONS.SWITCH_CUSTOMER_PLAN_STARTED:
      return true;
    case SUBSCRIPTIONS.SWICTH_CUSTOMER_PLAN_FINISHED:
      return false;
    case SUBSCRIPTIONS.UPDATE_CUSTOMER_METHOD_STARTED:
      return true;
    case SUBSCRIPTIONS.UPDATE_CUSTOMER_METHOD_FINISHED:
      return false;
    default:
      return state;
  }
};

export default loading;
