import {
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_USER_SUCCESS,
} from '../actions/actionTypes';

const initialState = { _id: '', hotel_id: '', email: '', token: '', user_type: '', name: '', hotel_name: '', hotel_motto: '', motto: '' };

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        _id: action.payload.id,
        hotel_id: action.payload.hotel_id,
        email: action.payload.email,
        token: action.payload.token,
        user_type: action.payload.user_type,
        name: action.payload.name,
        hotel_name: action.payload.hotel_name,
        hotel_motto: action.payload.hotel_motto,
        motto: action.payload.motto,
      };
    case LOGOUT:
      return { ...initialState };
    case UPDATE_USER_SUCCESS:
      if (state._id === action.payload.updatedUser._id) {
        return action.payload.updatedUser;
      }
      // break;
    default:
      return state;
  }
};

export default currentUser;
