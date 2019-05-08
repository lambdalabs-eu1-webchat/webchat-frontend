import {
  FETCH_ALL_USERS_SUCCESS,
  FETCH_SINGLE_USER_SUCCESS,
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
    case CREATE_USER_SUCCESS:
      return [...state, { ...action.payload.newUser }];
    case UPDATE_USER_SUCCESS:
      return state.map(user => {
        if (user.id === action.payload.updatedUser.id) {
          return { ...action.payload.updatedUser };
        }
        return user;
      });
    case DELETE_USER_SUCCESS:
      return state.filter(user => user.id !== action.payload.id);
    default:
      return state;
  }
};

export default users;
