// import axios from "axios";
import { DOMAIN, USERS } from '../../utils/paths';
import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_STARTED,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_FINISHED,
  FETCH_SINGLE_USER,
  FETCH_SINGLE_USER_STARTED,
  FETCH_SINGLE_USER_SUCCESS,
  FETCH_SINGLE_USER_FAILURE,
  FETCH_SINGLE_USER_FINISHED,
  FETCH_HOTEL_STAFF,
  FETCH_HOTEL_STAFF_STARTED,
  FETCH_HOTEL_STAFF_SUCCESS,
  FETCH_HOTEL_STAFF_FAILURE,
  FETCH_HOTEL_STAFF_FINISHED,
  CREATE_USER,
  CREATE_USER_STARTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_FINISHED,
  UPDATE_USER,
  UPDATE_USER_STARTED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_FINISHED,
  CHANGE_USER_TYPE,
  CHANGE_USER_TYPE_STARTED,
  CHANGE_USER_TYPE_SUCCESS,
  CHANGE_USER_TYPE_FAILURE,
  CHANGE_USER_TYPE_FINISHED,
  DELETE_USER,
  DELETE_USER_STARTED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_FINISHED,
} from './actionTypes';

// Synchronous action creators

export const fetchAllUsersSuccess = users => {
  if (!users) {
    throw new Error('fetchAllUsersSuccess requires a users argument');
  }
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    payload: {
      users,
    },
  };
};

export const fetchAllUsersFailure = error => {
  if (!error) {
    throw new Error('fetchAllUsersFailure requires an error argument');
  }
  return {
    type: FETCH_ALL_USERS_FAILURE,
    payload: {
      error,
    },
  };
};

export const fetchSingleUserSuccess = user => {
  if (!user) {
    throw new Error('fetchSingleUserSuccess requires a user argument');
  }
  return {
    type: FETCH_SINGLE_USER_SUCCESS,
    payload: {
      user,
    },
  };
};

export const fetchSingleUserFailure = error => {
  if (!error) {
    throw new Error('fetchSingleUserFailure requires an error argument');
  }
  return {
    type: FETCH_SINGLE_USER_FAILURE,
    payload: {
      error,
    },
  };
};

export const createUserSuccess = newUser => {
  if (!newUser) {
    throw new Error('createUserSuccess requires an newUser argument');
  }
  return {
    type: CREATE_USER_SUCCESS,
    payload: {
      newUser,
    },
  };
};

export const fetchHotelStaffSuccess = hotelStaff => {
  if (!hotelStaff) {
    throw new Error('fetchHotelStaffSuccess requires a hotelStaff argument');
  }
  return {
    type: FETCH_HOTEL_STAFF_SUCCESS,
    payload: {
      hotelStaff,
    },
  };
};

export const fetchHotelStaffFailure = error => {
  if (!error) {
    throw new Error('fetchHotelStaffFailure requires an error argument');
  }
  return {
    type: FETCH_HOTEL_STAFF_FAILURE,
    payload: {
      error,
    },
  };
};

export const createUserFailure = error => {
  if (!error) {
    throw new Error('createUserFailure requires an error argument');
  }
  return {
    type: CREATE_USER_FAILURE,
    payload: {
      error,
    },
  };
};

export const updateUserSuccess = updatedUser => {
  if (!updatedUser) {
    throw new Error('updateUserSuccess requires an updatedUser argument');
  }
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const updatedCurrentUser = { ...currentUser, ...updatedUser };
  localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
  return {
    type: UPDATE_USER_SUCCESS,
    payload: {
      updatedUser,
    },
  };
};

export const updateUserFailure = error => {
  if (!error) {
    throw new Error('updateUserFailure requires an error argument');
  }
  return {
    type: UPDATE_USER_FAILURE,
    payload: {
      error,
    },
  };
};

export const changeUserTypeSuccess = promotedUser => {
  if (!promotedUser) {
    throw new Error('changeUserTypeSuccess requires an promotedUser argument');
  }
  return {
    type: CHANGE_USER_TYPE_SUCCESS,
    payload: {
      promotedUser,
    },
  };
};

export const changeUserTypeFailure = error => {
  if (!error) {
    throw new Error('changeUserTypeFailure requires an error argument');
  }
  return {
    type: CHANGE_USER_TYPE_FAILURE,
    payload: {
      error,
    },
  };
};

export const deleteUserSuccess = id => {
  if (!id) {
    throw new Error('deleteUserSuccess requires a userId argument');
  }
  return {
    type: DELETE_USER_SUCCESS,
    payload: {
      id,
    },
  };
};

export const deleteUserFailure = error => {
  if (!error) {
    throw new Error('deleteUserFailure requires an error argument');
  }
  return {
    type: DELETE_USER_FAILURE,
    payload: {
      error,
    },
  };
};

// Asynchronous action creators

export const fetchAllUsers = () => async dispatch => {
  dispatch({ type: FETCH_ALL_USERS });
  dispatch({ type: FETCH_ALL_USERS_STARTED });
  try {
    const result = await fetch(`${DOMAIN}${USERS}`);
    const jsonResult = await result.json();
    dispatch({ type: FETCH_ALL_USERS_FINISHED });
    dispatch(fetchAllUsersSuccess(jsonResult));
  } catch (error) {
    dispatch(fetchAllUsersFailure(error));
  }
};

export const fetchSingleUser = id => async dispatch => {
  dispatch({ type: FETCH_SINGLE_USER });
  dispatch({ type: FETCH_SINGLE_USER_STARTED });
  try {
    const result = await fetch(`${DOMAIN}${USERS}/${id}`);
    const jsonResult = await result.json();
    dispatch({ type: FETCH_SINGLE_USER_FINISHED });
    dispatch(fetchAllUsersSuccess(jsonResult));
  } catch (error) {
    dispatch(fetchAllUsersFailure(error));
  }
};

export const fetchHotelStaff = id => async dispatch => {
  dispatch({ type: FETCH_HOTEL_STAFF });
  dispatch({ type: FETCH_HOTEL_STAFF_STARTED });
  try {
    const result = await fetch(`${DOMAIN}${USERS}?hotel_id=${id}`);
    const jsonResult = await result.json();
    dispatch({ type: FETCH_HOTEL_STAFF_FINISHED });
    dispatch(fetchHotelStaffSuccess(jsonResult));
  } catch (error) {
    dispatch(fetchHotelStaffFailure(error));
  }
};

export const createUser = (
  name,
  email,
  password,
  user_type,
  motto = '',
) => async (dispatch, getState) => {
  dispatch({ type: CREATE_USER });
  dispatch({ type: CREATE_USER_STARTED });
  const user = {
    hotel_id: getState().currentUser.hotel_id,
    name: String(name),
    email: String(email),
    password: String(password),
    motto: String(motto),
    user_type: String(user_type),
  };
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  try {
    const result = await fetch(`${DOMAIN}${USERS}`, config);
    const jsonResult = await result.json();
    dispatch({ type: CREATE_USER_FINISHED });
    if (result) {
      if (result.ok) {
        dispatch(createUserSuccess(jsonResult));
        dispatch(fetchHotelStaff(getState().currentUser.hotel_id));
      }
      return jsonResult;
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(createUserFailure(error.message));
  }
};

export const updateUser = (userUpdates, id) => async dispatch => {
  dispatch({ type: UPDATE_USER });
  dispatch({ type: UPDATE_USER_STARTED });
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userUpdates),
  };
  try {
    const result = await fetch(`${DOMAIN}${USERS}/${id}`, config);
    const jsonResult = await result.json();
    dispatch({ type: UPDATE_USER_FINISHED });
    if (result.ok) {
      dispatch(updateUserSuccess(jsonResult));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

export const changeUserType = (id, newType) => async dispatch => {
  dispatch({ type: CHANGE_USER_TYPE });
  dispatch({ type: CHANGE_USER_TYPE_STARTED });
  const promotedUser = {
    user_type: String(newType),
  };
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(promotedUser),
  };
  try {
    const result = await fetch(`${DOMAIN}${USERS}/${id}`, config);
    const jsonResult = await result.json();
    dispatch({ type: CHANGE_USER_TYPE_FINISHED });
    if (result.ok) {
      const newUser = { ...jsonResult };
      dispatch(changeUserTypeSuccess(newUser));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(changeUserTypeFailure(error.message));
  }
};

export const deleteUser = id => async (dispatch, getState) => {
  dispatch({ type: DELETE_USER });
  dispatch({ type: DELETE_USER_STARTED });
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const result = await fetch(`${DOMAIN}${USERS}/${id}`, config);
    const jsonResult = await result.json();
    dispatch({ type: DELETE_USER_FINISHED });
    if (result.ok) {
      dispatch(deleteUserSuccess(id));
      dispatch(fetchHotelStaff(getState().currentUser.hotel_id));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(deleteUserFailure(error));
  }
};
