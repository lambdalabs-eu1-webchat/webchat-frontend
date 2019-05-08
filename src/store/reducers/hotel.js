import {
  FETCH_SINGLE_HOTEL_SUCCESS,
  UPDATE_HOTEL_SUCCESS,
} from '../actions/actionTypes';

const initialState = { plan: '', _id: '', name: '', motto: '' };

const hotel = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_HOTEL_SUCCESS:
      return { ...action.payload.hotel };
    case UPDATE_HOTEL_SUCCESS:
      return state.map((hotel) => {
        if (hotel._id === action.payload.updatedHotel._id) {
          return { ...action.payload.updatedHotel };
        }
        return hotel;
      });
    default:
      return state;
  }
};

export default hotel;
