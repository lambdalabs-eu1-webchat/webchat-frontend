import { ROOMS } from '../actions/actionTypes';

const initState = {
  fetching: false,
  rooms: [],
  error: null,
  hotelHasZeroRooms: false,
};

const rooms = (state = initState, action) => {
  switch (action.type) {
    case ROOMS.FETCH_ROOMS_FOR_HOTEL:
      return { ...state, fetching: true };
    case ROOMS.FETCH_ROOMS_FOR_HOTEL_SUCCESS:
      return {
        ...state,
        fetching: false,
        rooms: action.payload,
        hotelHasZeroRooms: false,
      };
    case ROOMS.FETCH_ROOMS_FOR_HOTEL_FAILURE:
      return { ...state, fetching: false, error: action.payload };
    case ROOMS.CREATE_ROOM_FOR_HOTEL_SUCCESS:
      return { ...state, rooms: [...state.rooms, action.payload.newRoom] };
    case ROOMS.UPDATE_ROOM_FOR_HOTEL_SUCCESS:
      const newRooms = state.rooms.map(room => {
        if (room._id === action.payload._id) {
          return action.payload;
        }
        return room;
      });
      return { ...state, rooms: newRooms };
    case ROOMS.DELETE_ROOM_FOR_HOTEL_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.filter(room => room._id !== action.payload._id),
      };
    case ROOMS.HOTEL_HAS_ZERO_ROOMS:
      return { ...state, hotelHasZeroRooms: true };
    default:
      return state;
  }
};

export default rooms;
