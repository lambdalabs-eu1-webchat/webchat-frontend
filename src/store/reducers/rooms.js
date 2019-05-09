import { ROOMS } from '../actions/actionTypes';

const {
  FETCH_ROOMS_FOR_HOTEL,
  FETCH_ROOMS_FOR_HOTEL_FAILURE,
  FETCH_ROOMS_FOR_HOTEL_SUCCESS,
} = ROOMS;

const initState = { fetching: false, rooms: [], error: null };

const rooms = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ROOMS_FOR_HOTEL:
      return { ...state, fetching: true };
    case FETCH_ROOMS_FOR_HOTEL_SUCCESS:
      return { ...state, fetching: false, rooms: action.payload };
    case FETCH_ROOMS_FOR_HOTEL_FAILURE:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
};

export default rooms;
