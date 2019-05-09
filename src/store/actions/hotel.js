import { DOMAIN, HOTEL } from '../../utils/paths';
import {
  FETCH_SINGLE_HOTEL,
  FETCH_SINGLE_HOTEL_SUCCESS,
  FETCH_SINGLE_HOTEL_FAILURE,
} from './actionTypes';

// Synchronous action creators

export const fetchSingleHotelSuccess = hotel => {
    if (!hotel) {
      throw new Error('fetchSingleHotelSuccess requires a hotel argument');
    }
    return {
      type: FETCH_SINGLE_HOTEL_SUCCESS,
      payload: {
        hotel,
      },
    };
  };

export const fetchSingleHotelFailure = error => {
  if (!error) {
    throw new Error('fetchSingleHotelFailure requires an error argument');
  }
  return {
    type: FETCH_SINGLE_HOTEL_FAILURE,
    payload: {
      error,
    },
  };
};

// Asynchronous action creators

export const fetchSingleHotel = id => async dispatch => {
  dispatch({ type: FETCH_SINGLE_HOTEL });
  try {
    const result = await fetch(`${DOMAIN}${HOTEL}/${id}`);
    const jsonResult = await result.json();
    dispatch(fetchSingleHotelSuccess(jsonResult));
  } catch (error) {
    dispatch(fetchSingleHotelFailure(error));
  }
};
