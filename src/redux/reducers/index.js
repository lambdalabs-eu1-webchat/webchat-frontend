import { combineReducers } from "redux";

// need to pass in a valid reducer to stop errors
// delete this when the first reducer is made
function reducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const reducers = { reducer };

export default combineReducers(reducers);
