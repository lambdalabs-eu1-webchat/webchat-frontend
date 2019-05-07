import {
  FETCH_SINGLE_HOTEL_SUCCESS,
  SWITCH_CUSTOMER_PLAN_SUCCESS,
  CREATE_NEW_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_METHOD_SUCCESS,
} from '../actions/actionTypes';

const initialState = [];

const hotel = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_HOTEL_SUCCESS:
      return action.payload.hotel;
    case SWITCH_CUSTOMER_PLAN_SUCCESS:
      return action.payload.updatedHotel;
    case CREATE_NEW_CUSTOMER_SUCCESS:
      return action.payload.updatedHotel;
    case UPDATE_CUSTOMER_METHOD_SUCCESS:
      return action.payload.updatedHotel;
    default:
      return state;
  }
};

export default hotel;
