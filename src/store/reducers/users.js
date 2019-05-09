import {
  FETCH_ALL_USERS_SUCCESS,
  FETCH_SINGLE_USER_SUCCESS,
  FETCH_HOTEL_STAFF_SUCCESS,
  CREATE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
} from '../actions/actionTypes';

const initialState = [];

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS_SUCCESS:
      return [...action.payload.users];
    case FETCH_SINGLE_USER_SUCCESS:
      return [...action.payload.user];
    case FETCH_HOTEL_STAFF_SUCCESS:
      return [...action.payload.hotelStaff];
    case CREATE_USER_SUCCESS:
      return [...state, { ...action.payload.newUser }];
    case UPDATE_USER_SUCCESS:
      return state.map(user => {
        if (user._id === action.payload.updatedUser._id) {
          return { ...action.payload.updatedUser };
        }
        return user;
      });
    case DELETE_USER_SUCCESS:
      return state.filter(user => user._id !== action.payload._id);
    default:
      return state;
  }
};

export default users;
