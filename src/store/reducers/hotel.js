import {
  FETCH_SINGLE_HOTEL_SUCCESS,
  SWITCH_CUSTOMER_PLAN_SUCCESS,
} from '../actions/actionTypes';

const initialState = [];

const hotel = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_HOTEL_SUCCESS:
      return action.payload.hotel;
    case SWITCH_CUSTOMER_PLAN_SUCCESS:
      return action.payload.hotel;
    default:
      return state;
  }
};

export default hotel;
