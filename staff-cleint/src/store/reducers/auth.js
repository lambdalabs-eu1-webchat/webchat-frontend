import { LOGIN_SUCCESS, LOGOUT } from '../actions/actionTypes';

const initialState = '';

const authToken = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.token;
    case LOGOUT:
      return '';
    default:
      return state;
  }
};

export default authToken;
