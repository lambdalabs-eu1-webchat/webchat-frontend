import {
    REGISTER_USER_LOADING
  } from '../actions/actionTypes';
  
  const initialState = false;
  
  const loading = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_USER_LOADING:
        return !state;
      default:
        return state;
    }
  };
  
  export default loading;
  