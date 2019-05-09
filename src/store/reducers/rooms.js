import {
  CREATE_ROOM_FOR_HOTEL_SUCCESS,
  FETCH_ROOMS_FOR_HOTEL_SUCCESS,
  UPDATE_ROOM_FOR_HOTEL_SUCCESS,
  DELETE_ROOM_FOR_HOTEL_SUCCESS,
} from '../actions/actionTypes';
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
      case CREATE_ROOM_FOR_HOTEL_SUCCESS:
      return [...state, [ ...action.payload.newRoom ]];
    case UPDATE_ROOM_FOR_HOTEL_SUCCESS:
      return state.map((room) => {
        if (room._id === action.payload.updatedRoom._id) {
          return { ...action.payload.updatedRoom };
        }
        return room;
      });
    case DELETE_ROOM_FOR_HOTEL_SUCCESS:
      return state.filter(room => room._id !== action.payload._id);
    default:
      return state;
  }
};

export default rooms;
