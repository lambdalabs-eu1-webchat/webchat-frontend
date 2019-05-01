// import axios from "axios";
import DOMAIN from "./actionTypes";
import {
  FETCH_ALL_USERS_SUCCESS, FETCH_ALL_USERS_FAILURE, FETCH_ALL_USERS, FETCH_SINGLE_USER_SUCCESS,
  FETCH_SINGLE_USER_FAILURE, FETCH_SINGLE_USER, CREATE_USER, CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE, UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, DELETE_USER,
  DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
} from "./actionTypes";

// Synchronous action creators

export const fetchAllUsersSuccess = (users) => {
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

export const fetchAllUsersFailure = (error) => {
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

export const fetchSingleUserSuccess = (user) => {
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

export const fetchSingleUserFailure = (error) => {
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

export const createUserSuccess = (newUser) => {
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

export const createUserFailure = (error) => {
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

export const updateUserSuccess = (updatedUser) => {
  if (!updatedUser) {
    throw new Error('updateUserSuccess requires an updatedUser argument');
  }
  return {
    type: UPDATE_USER_SUCCESS,
    payload: {
      updatedUser,
    },
  };
};

export const updateUserFailure = (error) => {
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

// Asynchronous action creators

export const fetchAllUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_USERS });
  try {
    const result = await fetch(`${DOMAIN}users`);
    const jsonResult = await result.json();
    dispatch(fetchAllUsersSuccess(jsonResult));
  } catch (error) {
    dispatch(fetchAllUsersFailure(error));
  }
};

export const fetchSingleUser = id => async (dispatch) => {
  dispatch({ type: FETCH_SINGLE_USER });
  try {
    const result = await fetch(`${DOMAIN}users/:${id}`);
    const jsonResult = await result.json();
    dispatch(fetchAllUsersSuccess(jsonResult));
  } catch (error) {
    dispatch(fetchAllUsersFailure(error));
  }
};

export const createUser = (hotel_id, name, email, password, motto, user_type) => async (dispatch) => {
  dispatch({ type: CREATE_USER });
  const user = {
    hotel_id: String(hotel_id),
    name: String(name),
    email: String(email),
    password: String(password),
    motto: String(motto),
    user_type: String(user_type)
  };
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  try {
    const result = await fetch(`${DOMAIN}users`, config);
    const jsonResult = await result.json();
    const newUser = { ...jsonResult };
    if (result.ok) {
      dispatch(createUserSuccess(newUser));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(createUserFailure(error.message));
  }
};

export const updateUser = (id, name, email, password, motto) => async (dispatch) => {
  dispatch({ type: UPDATE_USER });
  const updatedUser = {
    name: String(name),
    email: String(email),
    password: String(password),
    motto: String(motto)
  };
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  };
  try {
    const result = await fetch(`${DOMAIN}users/${id}`, config);
    const jsonResult = await result.json();
    if (result.ok) {
      const newUser = { ...jsonResult };
      dispatch(updateUserSuccess(newUser));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

