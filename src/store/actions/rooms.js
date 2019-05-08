import { ROOMS } from './actionTypes';
import axios from 'axios';
import { HOTEL, DOMAIN } from '../../utils/paths';

//===============FETCHING ROOMS===========================
export const fetchRooms = hotel_id => async dispatch => {
  dispatch({ type: ROOMS.FETCH_ROOMS_FOR_HOTEL });
  try {
    debugger;
    const roomsRes = await axios.get(`${DOMAIN}${HOTEL}/${hotel_id}/rooms`);
    debugger;
    dispatch(successFetchRooms(roomsRes.data));
  } catch (error) {
    debugger;
    dispatch(failFetchRooms(error));
  }
};

function successFetchRooms(rooms) {
  return {
    type: ROOMS.FETCH_ROOMS_FOR_HOTEL_SUCCESS,
    payload: rooms,
  };
}
function failFetchRooms(error) {
  return {
    type: ROOMS.FETCH_ROOMS_FOR_HOTEL_FAILURE,
    payload: error,
  };
}
//===============UPDATING ROOMS===========================
