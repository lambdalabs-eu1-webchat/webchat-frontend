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
    const result = await fetch(`${DOMAIN}register`, config);
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

