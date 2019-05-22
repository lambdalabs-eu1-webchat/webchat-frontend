import { ROOMS } from './actionTypes';
import axios from 'axios';
import { axiosConfig } from '../../utils/axiosConfig';
import { HOTEL, DOMAIN } from '../../utils/paths';

export const fetchRooms = hotel_id => async dispatch => {
  dispatch({ type: ROOMS.FETCH_ROOMS_FOR_HOTEL });
  dispatch({ type: ROOMS.FETCH_ROOMS_FOR_HOTEL_STARTED });
  try {
    const roomsRes = await axios.get(
      `${DOMAIN}${HOTEL}/${hotel_id}/rooms`,
      axiosConfig
    );
    dispatch({ type: ROOMS.FETCH_ROOMS_FOR_HOTEL_FINISHED });
    dispatch(successFetchRooms(roomsRes.data));
  } catch (error) {
    dispatch(failFetchRooms(error));
  }
};

function successFetchRooms(rooms) {
  if (rooms.length === 0) {
    return {
      type: ROOMS.HOTEL_HAS_ZERO_ROOMS
    };
  }
  return {
    type: ROOMS.FETCH_ROOMS_FOR_HOTEL_SUCCESS,
    payload: rooms
  };
}
function failFetchRooms(error) {
  return {
    type: ROOMS.FETCH_ROOMS_FOR_HOTEL_FAILURE,
    payload: error
  };
}

export const fetchRoomsForHotelSuccess = rooms => {
  if (!rooms) {
    throw new Error('fetchRoomsForHotelSuccess requires a rooms argument');
  }
  return {
    type: ROOMS.FETCH_ROOMS_FOR_HOTEL_SUCCESS,
    payload: rooms
  };
};

export const fetchRoomsForHotelFailure = error => {
  if (!error) {
    throw new Error('fetchRoomsForHotelFailure requires an error argument');
  }
  return {
    type: ROOMS.FETCH_ROOMS_FOR_HOTEL_FAILURE,
    payload: {
      error
    }
  };
};

export const createRoomForHotelSuccess = newRoom => {
  if (!newRoom) {
    throw new Error('createRoomSuccess requires an newRoom argument');
  }
  return {
    type: ROOMS.CREATE_ROOM_FOR_HOTEL_SUCCESS,
    payload: {
      newRoom
    }
  };
};

export const createRoomForHotelFailure = error => {
  if (!error) {
    throw new Error('createRoomForHotelFailure requires an error argument');
  }
  return {
    type: ROOMS.CREATE_ROOM_FOR_HOTEL_FAILURE,
    payload: {
      error
    }
  };
};

export const updateRoomForHotelSuccess = updatedRoom => {
  if (!updatedRoom) {
    throw new Error(
      'updateRoomForHotelSuccess requires an updatedRoom argument'
    );
  }
  return {
    type: ROOMS.UPDATE_ROOM_FOR_HOTEL_SUCCESS,
    payload: updatedRoom
  };
};

export const updateRoomForHotelFailure = error => {
  if (!error) {
    throw new Error('updateRoomForHotelFailure requires an error argument');
  }
  return {
    type: ROOMS.UPDATE_ROOM_FOR_HOTEL_FAILURE,
    payload: {
      error
    }
  };
};

export const deleteRoomForHotelSuccess = id => {
  if (!id) {
    throw new Error('deleteRoomForHotelSuccess requires a roomId argument');
  }
  return {
    type: ROOMS.DELETE_ROOM_FOR_HOTEL_SUCCESS,
    payload: {
      id
    }
  };
};

export const deleteRoomForHotelFailure = error => {
  if (!error) {
    throw new Error('deleteRoomForHotelFailure requires an error argument');
  }
  return {
    type: ROOMS.DELETE_ROOM_FOR_HOTEL_FAILURE,
    payload: {
      error
    }
  };
};

export const fetchRoomsForHotel = hotel_id => async dispatch => {
  dispatch({ type: ROOMS.FETCH_ROOMS_FOR_HOTEL });
  dispatch({ type: ROOMS.FETCH_ROOMS_FOR_HOTEL_STARTED });
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
    };
    const result = await fetch(`${DOMAIN}${HOTEL}/${hotel_id}/rooms`, config);
    const jsonResult = await result.json();
    dispatch({ type: ROOMS.FETCH_ROOMS_FOR_HOTEL_FINISHED });
    dispatch(fetchRoomsForHotelSuccess(jsonResult));
  } catch (error) {
    dispatch(fetchRoomsForHotelFailure(error));
  }
};

export const createRoomForHotel = (
  newRoomArray,
  hotel_id
) => async dispatch => {
  dispatch({ type: ROOMS.CREATE_ROOM_FOR_HOTEL });
  dispatch({ type: ROOMS.CREATE_ROOM_FOR_HOTEL_STARTED });
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify(newRoomArray)
  };
  try {
    const result = await fetch(`${DOMAIN}${HOTEL}/${hotel_id}/rooms`, config);
    const jsonResult = await result.json();
    const newRoom = jsonResult.currentRoomList || jsonResult;
    dispatch({ type: ROOMS.CREATE_ROOM_FOR_HOTEL_FINISHED });
    if (result.ok) {
      dispatch(createRoomForHotelSuccess(newRoom));
      dispatch(fetchRoomsForHotel(hotel_id));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(createRoomForHotelFailure(error.message));
  }
};

export const updateRoomForHotel = (id, hotel_id, name) => async dispatch => {
  dispatch({ type: ROOMS.UPDATE_ROOM_FOR_HOTEL });
  dispatch({ type: ROOMS.UPDATE_ROOM_FOR_HOTEL_STARTED });
  const updatedRoom = {
    name: String(name)
  };
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify(updatedRoom)
  };
  try {
    const result = await fetch(
      `${DOMAIN}${HOTEL}/${hotel_id}/rooms/${id}`,
      config
    );
    const jsonResult = await result.json();
    dispatch({ type: ROOMS.UPDATE_ROOM_FOR_HOTEL_FINISHED });
    if (result.ok) {
      const newRoom = { ...jsonResult };
      dispatch(updateRoomForHotelSuccess(newRoom));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(updateRoomForHotelFailure(error.message));
  }
};

export const deleteRoomForHotel = (id, hotel_id) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ROOMS.DELETE_ROOM_FOR_HOTEL });
  dispatch({ type: ROOMS.DELETE_ROOM_FOR_HOTEL_STARTED });
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  };
  try {
    const result = await fetch(
      `${DOMAIN}${HOTEL}/${hotel_id}/rooms/${id}`,
      config
    );
    const jsonResult = await result.json();
    dispatch({ type: ROOMS.DELETE_ROOM_FOR_HOTEL_FINISHED });
    if (result.ok) {
      dispatch(deleteRoomForHotelSuccess(id));
      dispatch(fetchRoomsForHotel(getState().currentUser.hotel_id));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(deleteRoomForHotelFailure(error));
  }
};
