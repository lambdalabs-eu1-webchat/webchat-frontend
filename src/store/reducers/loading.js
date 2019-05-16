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
  FETCH_ALL_USERS_STARTED,
  FETCH_ALL_USERS_FINISHED,
  FETCH_SINGLE_USER_STARTED,
  FETCH_SINGLE_USER_FINISHED,
  FETCH_HOTEL_STAFF_STARTED,
  FETCH_HOTEL_STAFF_FINISHED,
  CREATE_USER_STARTED,
  CREATE_USER_FINISHED,
  UPDATE_USER_STARTED,
  UPDATE_USER_FINISHED,
  CHANGE_USER_TYPE_STARTED,
  CHANGE_USER_TYPE_FINISHED,
  DELETE_USER_STARTED,
  DELETE_USER_FINISHED,
} from '../actions/actionTypes';

const initialState = {
  login: false,
  register: false,
  updateHotel: false,
  fetchHotel: false,
  fetchRooms: false,
  updateRoom: false,
  deleteRoom: false,
  createRoom: false,
  createCustomer: false,
  switchPlan: false,
  updateCustomerMethod: false,
  fetchUsers: false,
  fetchUser: false,
  fetchStaff: false,
  createUser: false,
  updateUser: false,
  changeUserType: false,
  deleteUser: false,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_STARTED:
      return {
        ...state,
        login: true,
      };
    case LOGIN_REQUEST_FINISHED:
      return {
        ...state,
        login: false,
      };
    case REGISTER_USER_STARTED:
      return {
        ...state,
        register: true,
      };
    case REGISTER_USER_FINISHED:
      return {
        ...state,
        register: false,
      };
    case UPDATE_HOTEL_STARTED:
      return {
        ...state,
        updateHotel: true,
      };
    case UPDATE_HOTEL_FINISHED:
      return {
        ...state,
        updateHotel: false,
      };
    case FETCH_SINGLE_HOTEL_STARTED:
      return {
        ...state,
        fetchHotel: true,
      };
    case FETCH_SINGLE_HOTEL_FINISHED:
      return {
        ...state,
        fetchHotel: false,
      };
    case ROOMS.FETCH_ROOMS_FOR_HOTEL_STARTED:
      return {
        ...state,
        fetchRooms: true,
      };
    case ROOMS.FETCH_ROOMS_FOR_HOTEL_FINISHED:
      return {
        ...state,
        fetchRooms: false,
      };
    case ROOMS.UPDATE_ROOM_FOR_HOTEL_STARTED:
      return {
        ...state,
        updateRoom: true,
      };
    case ROOMS.UPDATE_ROOM_FOR_HOTEL_FINISHED:
      return {
        ...state,
        updateRoom: false,
      };
    case ROOMS.DELETE_ROOM_FOR_HOTEL_STARTED:
      return {
        ...state,
        deleteRoom: true,
      };
    case ROOMS.DELETE_ROOM_FOR_HOTEL_FINISHED:
      return {
        ...state,
        deleteRoom: false,
      };
    case ROOMS.CREATE_ROOM_FOR_HOTEL_STARTED:
      return {
        ...state,
        createRoom: true,
      };
    case ROOMS.CREATE_ROOM_FOR_HOTEL_FINISHED:
      return {
        ...state,
        createRoom: false,
      };
    case SUBSCRIPTIONS.CREATE_NEW_CUSTOMER_STARTED:
      return {
        ...state,
        createCustomer: true,
      };
    case SUBSCRIPTIONS.CREATE_NEW_CUSTOMER_FINISHED:
      return {
        ...state,
        createCustomer: false,
      };
    case SUBSCRIPTIONS.SWITCH_CUSTOMER_PLAN_STARTED:
      return {
        ...state,
        switchPlan: true,
      };
    case SUBSCRIPTIONS.SWICTH_CUSTOMER_PLAN_FINISHED:
      return {
        ...state,
        switchPlan: false,
      };
    case SUBSCRIPTIONS.UPDATE_CUSTOMER_METHOD_STARTED:
      return {
        ...state,
        updateCustomerMethod: true,
      };
    case SUBSCRIPTIONS.UPDATE_CUSTOMER_METHOD_FINISHED:
      return {
        ...state,
        updateCustomerMethod: false,
      };
    case FETCH_ALL_USERS_STARTED:
      return {
        ...state,
        fetchUsers: true,
      };
    case FETCH_ALL_USERS_FINISHED:
      return {
        ...state,
        fetchUsers: false,
      };
    case FETCH_SINGLE_USER_STARTED:
      return {
        ...state,
        fetchUser: true,
      };
    case FETCH_SINGLE_USER_FINISHED:
      return {
        ...state,
        fetchUser: false,
      };
    case FETCH_HOTEL_STAFF_STARTED:
      return {
        ...state,
        fetchStaff: true,
      };
    case FETCH_HOTEL_STAFF_FINISHED:
      return {
        ...state,
        fetchUser: false,
      };
    case CREATE_USER_STARTED:
      return {
        ...state,
        createUser: true,
      };
    case CREATE_USER_FINISHED:
      return {
        ...state,
        createUser: false,
      };
    case UPDATE_USER_STARTED:
      return {
        ...state,
        updateUser: true,
      };
    case UPDATE_USER_FINISHED:
      return {
        ...state,
        updateUser: false,
      };
    case CHANGE_USER_TYPE_STARTED:
      return {
        ...state,
        changeUserType: true,
      };
    case CHANGE_USER_TYPE_FINISHED:
      return {
        ...state,
        changeUserType: false,
      };
    case DELETE_USER_STARTED:
      return {
        ...state,
        deleteUser: true,
      };
    case DELETE_USER_FINISHED:
      return {
        ...state,
        deleteUser: false,
      };
    default:
      return state;
  }
};

export default loading;
