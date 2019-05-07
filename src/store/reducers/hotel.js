import { FETCH_SINGLE_HOTEL_SUCCESS } from '../actions/actionTypes';

const initialState = [];

const hotel = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_HOTEL_SUCCESS:
      return [...action.payload.hotel];
    default:
      return state;
  }
};

export default hotel;
