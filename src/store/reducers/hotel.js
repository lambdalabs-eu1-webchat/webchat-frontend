import {
  FETCH_SINGLE_HOTEL_SUCCESS,
  SUBSCRIPTIONS,
} from '../actions/actionTypes';

const initialState = {};

const hotel = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_HOTEL_SUCCESS:
      return action.payload.hotel;
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
