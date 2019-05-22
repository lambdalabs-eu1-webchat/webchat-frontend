import { DOMAIN, LOGIN, REGISTER } from '../../utils/paths';
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST_FINISHED,
  REGISTER_USER,
  REGISTER_USER_STARTED,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_FINISHED,
  LOGOUT
} from './actionTypes';

export const registerUserSuccess = newUser => {
  if (!newUser) {
    throw new Error('registerUserSuccess requires an newUser argument');
  }
  return {
    type: REGISTER_USER_SUCCESS,
    payload: {
      newUser
    }
  };
};

export const registerUserFailure = error => {
  if (!error) {
    throw new Error('registerUserFailure requires an error argument');
  }
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      error
    }
  };
};

export const logout = () => ({
  type: LOGOUT
});

export const loginSuccess = (id, hotel_id, email, token, user_type, name) => {
  const currentUser = {
    id,
    hotel_id,
    email,
    token,
    user_type,
    name
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
      name
    }
  };
};

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});

// Asynchronous action creators

export const loginRequest = (email, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  dispatch({ type: LOGIN_REQUEST_STARTED });
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  };
  try {
    const result = await fetch(`${DOMAIN}${LOGIN}`, config);
    const jsonResult = await result.json();
    dispatch({ type: LOGIN_REQUEST_FINISHED });
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
        jsonResult.user.name
      )
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
  hotelName
}) => async dispatch => {
  dispatch({ type: REGISTER_USER });
  dispatch({ type: REGISTER_USER_STARTED });
  const user = {
    name: String(name),
    email: String(email),
    password: String(password),
    hotel_name: String(hotelName)
  };
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };
  try {
    const result = await fetch(`${DOMAIN}${REGISTER}`, config);
    const jsonResult = await result.json();
    const newUser = jsonResult;
    dispatch({ type: REGISTER_USER_FINISHED });
    if (result.ok) {
      dispatch(registerUserSuccess(newUser));
      return jsonResult;
    } else {
      return jsonResult;
    }
  } catch (error) {
    dispatch(registerUserFailure(error));
  }
};
