import { DOMAIN, HOTEL } from '../../utils/paths';
import {
  UPDATE_HOTEL_SUCCESS,
  UPDATE_HOTEL_FAILURE,
  UPDATE_HOTEL,
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

export const updateHotelSuccess = updatedHotel => {
  if (!updatedHotel) {
    throw new Error('updateHotelSuccess requires an updatedHotel argument');
  }
  return {
    type: UPDATE_HOTEL_SUCCESS,
    payload: {
      updatedHotel,
    },
  };
};

export const updateHotelFailure = error => {
  if (!error) {
    throw new Error('updateHotelFailure requires an error argument');
  }
  return {
    type: UPDATE_HOTEL_FAILURE,
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

export const updateHotel = (
    id,
    name,
    motto,
) => async dispatch => {
  dispatch({ type: UPDATE_HOTEL });
  const updatedHotel = {
    name: String(name),
    motto: String(motto)
  };
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedHotel),
  };
  try {
    const result = await fetch(`${DOMAIN}${HOTEL}/${id}`, config);
    const jsonResult = await result.json();
    if (result.ok) {
      const newHotel = { ...jsonResult };
      dispatch(updateHotelSuccess(newHotel));
      dispatch(fetchSingleHotel(id));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(updateHotelFailure(error.message));
  }
};
