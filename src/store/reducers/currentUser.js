import { LOGIN_SUCCESS, LOGOUT } from '../actions/actionTypes';

const initialState = { _id: null, hotel_id: null, name: '', email: '' };

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        _id: action.payload._id,
        hotel_id: action.payload.hotel_id,
        name: action.payload.name,
        email: action.payload.email,
        user_type: action.payload.user_type,
      };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default currentUser;
