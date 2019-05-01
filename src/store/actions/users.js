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
