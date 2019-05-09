import {
  CREATE_ROOM_FOR_HOTEL_SUCCESS,
  FETCH_ROOMS_FOR_HOTEL_SUCCESS,
  UPDATE_ROOM_FOR_HOTEL_SUCCESS,
  DELETE_ROOM_FOR_HOTEL_SUCCESS,
} from '../actions/actionTypes';

const initialState = [];

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMS_FOR_HOTEL_SUCCESS:
      return [...action.payload.rooms];
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
