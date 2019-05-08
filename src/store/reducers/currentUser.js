import { LOGIN_SUCCESS, LOGOUT } from '../actions/actionTypes';

const initialState = { _id: null, hotel_id: null, email: '', token: null, user_type: '', name: '' };

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        _id: action.payload._id,
        hotel_id: action.payload.hotel_id,
        email: action.payload.email,
        token: action.payload.token,
        user_type: action.payload.user_type,
        name: action.payload.name,

      };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default currentUser;
