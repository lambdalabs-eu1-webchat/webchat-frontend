import DOMAIN from "./actionTypes";
import {
  LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGOUT, REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
} from './actionTypes';

export const registerUserSuccess = (newUser) => {
  if (!newUser) {
    throw new Error('registerUserSuccess requires an newUser argument');
  }
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      newUser,
    },
  };
};

export const registerUserFailure = (error) => {
  if (!error) {
    throw new Error('registerUserFailure requires an error argument');
  }
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      error,
    },
  };
};

export const logout = () => ({
  type: LOGOUT,
});

export const loginSuccess = (id, hotel_id, name, token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      id,
      hotel_id,
      name,
      token,
    },
  };
};

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: {
    error,
  },
});

// Asynchronous action creators

export const loginRequest = (name, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  };
  try {
    const result = await fetch(`${DOMAIN}auth/login`, config);
    const jsonResult = await result.json();
    if (result.status === 401) {
      throw new Error(jsonResult.error);
    }
    dispatch(loginSuccess(jsonResult.user._id, jsonResult.user.hotel_id, jsonResult.user.name, jsonResult.token));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const registerUser = (name, hotel_id, password, email) => async (dispatch) => {
  dispatch({ type: REGISTER_USER });
  const user = {
    name: String(name),
    hotel_id: String(hotel_id),
    password: String(password),
    email: String(email),
  };
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  try {
    const result = await fetch(`${DOMAIN}auth/register`, config);
    const jsonResult = await result.json();
    const newUser = jsonResult;
    if (result.ok) {
      dispatch(registerUserSuccess(newUser));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(registerUserFailure(error));
  }
};

