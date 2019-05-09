import { ROOMS } from '../actions/actionTypes';

const initState = [];

const rooms = (state = initState, action) => {
  switch (action.type) {
    case ROOMS.FETCH_ROOMS_FOR_HOTEL_SUCCESS:
      return [ ...action.payload.rooms ];
      case ROOMS.CREATE_ROOM_FOR_HOTEL_SUCCESS:
      return [...action.payload.newRoom ];
    case ROOMS.UPDATE_ROOM_FOR_HOTEL_SUCCESS:
      return state.map((room) => {
        if (room._id === action.payload.updatedRoom._id) {
          return { ...action.payload.updatedRoom };
        }
        return room;
      });
    case ROOMS.DELETE_ROOM_FOR_HOTEL_SUCCESS:
      return state.filter(room => room._id !== action.payload._id);
    default:
      return state;
  }
};

export default rooms;
