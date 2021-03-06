// =============== Auth ==================//

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_STARTED = 'REGISTER_USER_STARTED';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const REGISTER_USER_FINISHED = 'REGISTER_USER_FINISHED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_STARTED = 'LOGIN_REQUST_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_REQUEST_FINISHED = 'LOGIN_REQUEST_FINISHED';

export const LOGOUT = 'LOGOUT';

// =============== Users ==================//

export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const FETCH_ALL_USERS_STARTED = 'FETCH_ALL_USERS_STARTED';
export const FETCH_ALL_USERS_SUCCESS = 'FETCH_ALL_USERS_SUCCESS';
export const FETCH_ALL_USERS_FAILURE = 'FETCH_ALL_USERS_FAILURE';
export const FETCH_ALL_USERS_FINISHED = 'FETCH_ALL_USERS_FINISHED';

export const FETCH_SINGLE_USER = 'FETCH_SINGLE_USER';
export const FETCH_SINGLE_USER_STARTED = 'FETCH_SINGLE_USER_STARTED';
export const FETCH_SINGLE_USER_SUCCESS = 'FETCH_SINGLE_USER_SUCCESS';
export const FETCH_SINGLE_USER_FAILURE = 'FETCH_SINGLE_USER_FAILURE';
export const FETCH_SINGLE_USER_FINISHED = 'FETCH_SINGLE_USER_FINISHED';

export const FETCH_HOTEL_STAFF = 'FETCH_HOTEL_STAFF';
export const FETCH_HOTEL_STAFF_STARTED = 'FETCH_HOTEL_STAFF_STARTED';
export const FETCH_HOTEL_STAFF_SUCCESS = 'FETCH_HOTEL_STAFF_SUCCESS';
export const FETCH_HOTEL_STAFF_FAILURE = 'FETCH_HOTEL_STAFF_FAILURE';
export const FETCH_HOTEL_STAFF_FINISHED = 'FETCH_HOTEL_STAFF_FINISHED';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_STARTED = 'CREATE_USER_STARTED';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const CREATE_USER_FINISHED = 'CREATE_USER_FINISHED';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_STARTED = 'UPDATE_USER_STARTED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const UPDATE_USER_FINISHED = 'UPDATE_USER_FINISHED';

export const CHANGE_USER_TYPE = 'CHANGE_USER_TYPE';
export const CHANGE_USER_TYPE_STARTED = 'CHANGE_USER_TYPE_STARTED';
export const CHANGE_USER_TYPE_SUCCESS = 'CHANGE_USER_TYPE_SUCCESS';
export const CHANGE_USER_TYPE_FAILURE = 'CHANGE_USER_TYPE_FAILURE';
export const CHANGE_USER_TYPE_FINISHED = 'CHANGE_USER_TYPE_FINISHED';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_STARTED = 'DELETE_USER_STARTED';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const DELETE_USER_FINISHED = 'DELETE_USER_FINISHED';

// =============== Hotels ==================//

export const CREATE_HOTEL = 'CREATE_HOTEL';
export const CREATE_HOTEL_STARTED = 'CREATE_HOTEL_STARTED';
export const CREATE_HOTEL_SUCCESS = 'CREATE_HOTEL_SUCCESS';
export const CREATE_HOTEL_FAILURE = 'CREATE_HOTEL_FAILURE';
export const CREATE_HOTEL_FINISHED = 'CREATE_HOTEL_FINISHED';

export const FETCH_SINGLE_HOTEL = 'FETCH_SINGLE_HOTEL';
export const FETCH_SINGLE_HOTEL_STARTED = 'FETCH_SINGLE_HOTEL_STARTED';
export const FETCH_SINGLE_HOTEL_SUCCESS = 'FETCH_SINGLE_HOTEL_SUCCESS';
export const FETCH_SINGLE_HOTEL_FAILURE = 'FETCH_SINGLE_HOTEL_FAILURE';
export const FETCH_SINGLE_HOTEL_FINISHED = 'FETCH_SINGLE_HOTEL_FINISHED';

export const UPDATE_HOTEL = 'UPDATE_HOTEL';
export const UPDATE_HOTEL_STARTED = 'UPDATE_HOTEL_STARTED';
export const UPDATE_HOTEL_SUCCESS = 'UPDATE_HOTEL_SUCCESS';
export const UPDATE_HOTEL_FAILURE = 'UPDATE_HOTEL_FAILURE';
export const UPDATE_HOTEL_FINISHED = 'UPDATE_HOTEL_FINISHED';

// =============== Rooms ==================//
export const ROOMS = {
  CREATE_ROOM_FOR_HOTEL: 'CREATE_ROOM_FOR_HOTEL',
  CREATE_ROOM_FOR_HOTEL_STARTED: 'CREATE_ROOM_FOR_HOTEL_STARTED',
  CREATE_ROOM_FOR_HOTEL_SUCCESS: 'CREATE_ROOM_FOR_HOTEL_SUCCESS',
  CREATE_ROOM_FOR_HOTEL_FAILURE: 'CREATE_ROOM_FOR_HOTEL_FAILURE',
  CREATE_ROOM_FOR_HOTEL_FINISHED: 'CREATE_ROOM_FOR_HOTEL_FINISHED',
  FETCH_ROOMS_FOR_HOTEL: 'FETCH_ROOMS_FOR_HOTEL',
  FETCH_ROOMS_FOR_HOTEL_STARTED: 'FETCH_ROOMS_FOR_HOTEL_STARTED',
  FETCH_ROOMS_FOR_HOTEL_SUCCESS: 'FETCH_ROOMS_FOR_HOTEL_SUCCESS',
  FETCH_ROOMS_FOR_HOTEL_FAILURE: 'FETCH_ROOMS_FOR_HOT_FAILURE',
  FETCH_ROOMS_FOR_HOTEL_FINISHED: 'FETCH_ROOMS_FOR_HOTEL_FINISHED',
  UPDATE_ROOM_FOR_HOTEL: 'UPDATE_ROOM_FOR_HOTEL',
  UPDATE_ROOM_FOR_HOTEL_STARTED: 'UPDATE_ROOM_FOR_HOTEL_STARTED',
  UPDATE_ROOM_FOR_HOTEL_SUCCESS: 'UPDATE_ROOM_FOR_HOTEL_SUCCESS',
  UPDATE_ROOM_FOR_HOTEL_FAILURE: 'UPDATE_ROOM_FOR_HOT_FAILURE',
  UPDATE_ROOM_FOR_HOTEL_FINISHED: 'UPDATE_ROOM_FOR_HOTEL_FINISHED',
  DELETE_ROOM_FOR_HOTEL: 'DELETE_ROOM_FOR_HOTEL',
  DELETE_ROOM_FOR_HOTEL_STARTED: 'DELETE_ROOM_FOR_HOTEL_STARTED',
  DELETE_ROOM_FOR_HOTEL_SUCCESS: 'DELETE_ROOM_FOR_HOTEL_SUCCESS',
  DELETE_ROOM_FOR_HOTEL_FAILURE: 'DELETE_ROOM_FOR_HOTEL_FAILURE',
  HOTEL_HAS_ZERO_ROOMS: 'HOTEL_HAS_ZERO_ROOMS',
  DELETE_ROOM_FOR_HOTEL_FINISHED: 'DELETE_ROOM_FOR_HOTEL_FINISHED',
};

// =============== Subscription ==================//

export const SUBSCRIPTIONS = {
  CREATE_NEW_CUSTOMER: 'CREATE_NEW_CUSTOMER',
  CREATE_NEW_CUSTOMER_STARTED: 'CREATE_NEW_CUSTOMER_STARTED',
  CREATE_NEW_CUSTOMER_SUCCESS: 'CREATE_NEW_CUSTOMER_SUCCESS',
  CREATE_NEW_CUSTOMER_FAILURE: 'CREATE_NEW_CUSTOMER_FAILURE',
  CREATE_NEW_CUSTOMER_FINISHED: 'CREATE_NEW_CUSTOMER_FINISHED',
  SWITCH_CUSTOMER_PLAN: 'SWITCH_CUSTOMER_PLAN',
  SWITCH_CUSTOMER_PLAN_STARTED: 'SWICTH_CUSTOMER_PLAN_STARTED',
  SWITCH_CUSTOMER_PLAN_SUCCESS: 'SWITCH_CUSTOMER_PLAN_SUCCESS',
  SWITCH_CUSTOMER_PLAN_FAILURE: 'SWITCH_CUSTOMER_PLAN_FAILURE',
  SWITCH_CUSTOMER_PLAN_FINISHED: 'SWITCH_CUSTOMER_PLAN_FINISHED',
  UPDATE_CUSTOMER_METHOD: 'UPDATE_CUSTOMER_METHOD',
  UPDATE_CUSTOMER_METHOD_STARTED: 'UPDATE_CUSTOMER_METHOD_STARTED',
  UPDATE_CUSTOMER_METHOD_SUCCESS: 'UPDATE_CUSTOMER_METHOD_SUCCESS',
  UPDATE_CUSTOMER_METHOD_FAILURE: 'UPDATE_CUSTOMER_METHOD_FAILURE',
  UPDATE_CUSTOMER_METHOD_FINISHED: 'UPDATE_CUSTOMER_METHOD_FINISHED',
};

// =============== Chats ==================//

export const CHATS = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  ADD_ACTIVE_CHATS: 'ADD_ACTIVE_CHATS',
  ADD_QUEUED_CHATS: 'ADD_QUEUED_CHATS',
  ADD_QUEUED_CHAT: 'ADD_QUEUED_CHAT',
  REMOVE_QUEUED_CHAT: 'REMOVE_QUEUED_CHAT',
  UPDATE_ACTIVE_CHAT: 'UPDATE_ACTIVE_CHAT',
  FETCH_CLOSED_CHATS: 'FETCH_CLOSED_CHATS',
  FETCH_CLOSED_CHATS_STARTED: 'FETCH_CLOSED_CHATS_STARTED',
  FETCH_CLOSED_CHATS_SUCCESS: 'FETCH_CLOSED_CHATS_SUCCESS',
  FETCH_CLOSED_CHATS_FAILURE: 'FETCH_CLOSED_CHATS_FAILURE',
  FETCH_CLOSED_CHATS_FINISHED: 'FETCH_CLOSED_CHATS_FINISHED',
  SAVE_SOCKET: 'SAVE_SOCKET',
  SET_CURRENT_CHAT_ID: 'SET_CURRENT_CHAT_ID',
  CLEAR_CURRENT_CHAT_ID: 'CLEAR_CURRENT_CHAT_ID',
  ADD_QUEUE_MESSAGE: 'ADD_QUEUE_MESSAGE',
  ADD_CURRENT_TYPER: 'ADD_CURRENT_TYPER',
  CLEAR_CURRENT_TYPER: 'CLEAR_CURRENT_TYPER',
  UPDATE_TICKET_LANGUAGE: 'UPDATE_TICKET_LANGUAGE',
  TRANSLATE_CHATS_FAILURE: 'TRANSLATE_CHATS_FAILURE',
  ADD_TRANSLATED_TICKET: 'ADD_TRANSLATED_TICKET',
};
