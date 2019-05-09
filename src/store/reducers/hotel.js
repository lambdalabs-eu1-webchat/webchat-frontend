import {
  FETCH_SINGLE_HOTEL_SUCCESS,
  UPDATE_HOTEL_SUCCESS, 
  SUBSCRIPTIONS,
} from '../actions/actionTypes';

const initialState = { plan: '', _id: '', name: '', motto: '', rooms: [], _v: 0 };

const hotel = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_HOTEL_SUCCESS:
      return { ...action.payload.hotel };
    case UPDATE_HOTEL_SUCCESS: {
      if (state._id === action.payload.updatedHotel._id) {
        return { ...action.payload.updatedHotel };
      }
      return hotel;
    }
    case SUBSCRIPTIONS.SWITCH_CUSTOMER_PLAN_SUCCESS:
      return action.payload.updatedHotel;
    case SUBSCRIPTIONS.CREATE_NEW_CUSTOMER_SUCCESS:
      return action.payload.updatedHotel;
    case SUBSCRIPTIONS.UPDATE_CUSTOMER_METHOD_SUCCESS:
      return action.payload.updatedHotel;
    default:
      return state;
  }
};

export default hotel;
