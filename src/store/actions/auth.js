import { DOMAIN, LOGIN, REGISTER } from '../../utils/paths';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_LOADING,
} from './actionTypes';

export const registerUserSuccess = newUser => {
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

export const registerUserFailure = error => {
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

export const loginSuccess = (
  id,
  hotel_id,
  email,
  token,
  user_type,
  name,
  motto,
) => {
  const currentUser = {
    id,
    hotel_id,
    email,
    token,
    user_type,
    name,
    motto,
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  localStorage.setItem('token', token);
  return {
    type: LOGIN_SUCCESS,
    payload: {
      id,
      hotel_id,
      email,
      token,
      user_type,
      name,
      motto,
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

export const loginRequest = (email, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const result = await fetch(`${DOMAIN}${LOGIN}`, config);
    const jsonResult = await result.json();
    if (result.status === 401) {
      return jsonResult;
    }
    dispatch(
      loginSuccess(
        jsonResult.user._id,
        jsonResult.user.hotel_id,
        jsonResult.user.email,
        jsonResult.token,
        jsonResult.user.user_type,
        jsonResult.user.name,
        jsonResult.user.motto,
      ),
    );
    return jsonResult;
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const registerUser = ({
  name,
  email,
  password,
  motto,
  hotelName,
  hotelMotto,
}) => async dispatch => {
  dispatch({ type: REGISTER_USER });
  dispatch({ type: REGISTER_USER_LOADING });
  const user = {
    name: String(name),
    email: String(email),
    password: String(password),
    motto: String(motto),
    hotel_name: String(hotelName),
    hotel_motto: String(hotelMotto),
  };
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  try {
    const result = await fetch(`${DOMAIN}${REGISTER}`, config);
    const jsonResult = await result.json();
    const newUser = jsonResult;
    if (result.ok) {
      dispatch(registerUserSuccess(newUser));
      dispatch({ type: REGISTER_USER_LOADING });
      return jsonResult;
    } else {
      dispatch({ type: REGISTER_USER_LOADING });
      return jsonResult;
    }
  } catch (error) {
    dispatch(registerUserFailure(error));
  }
};
