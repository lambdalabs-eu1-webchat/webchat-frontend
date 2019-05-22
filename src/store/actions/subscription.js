import { DOMAIN, SUBSCRIPTION, METHOD } from '../../utils/paths';
import { SUBSCRIPTIONS } from './actionTypes';

// Synchronous action creators

export const switchCustomerPlanSuccess = updatedHotel => {
  if (!updatedHotel) {
    throw new Error(
      'switchCustomerPlanSuccess requires an updatedHotel argument'
    );
  }
  return {
    type: SUBSCRIPTIONS.SWITCH_CUSTOMER_PLAN_SUCCESS,
    payload: {
      updatedHotel
    }
  };
};

export const switchCustomerPlanFailure = error => {
  if (!error) {
    throw new Error('switchCustomerPlanSuccess requires an error argument');
  }
  return {
    type: SUBSCRIPTIONS.SWITCH_CUSTOMER_PLAN_FAILURE,
    payload: {
      error
    }
  };
};

export const creatNewCustomerSuccess = updatedHotel => {
  if (!updatedHotel) {
    throw new Error(
      'creatNewCustomerSuccess requires an updatedHotel argument'
    );
  }
  return {
    type: SUBSCRIPTIONS.CREATE_NEW_CUSTOMER_SUCCESS,
    payload: {
      updatedHotel
    }
  };
};

export const createNewCustomerFailure = error => {
  if (!error) {
    throw new Error('switchCustomerPlanSuccess requires an error argument');
  }
  return {
    type: SUBSCRIPTIONS.CREATE_NEW_CUSTOMER_FAILURE,
    payload: {
      error
    }
  };
};

export const updateCustomerMethodSuccess = updatedHotel => {
  if (!updatedHotel) {
    throw new Error(
      'updateCustomerMethodSuccess requires an updatedHotel argument'
    );
  }
  return {
    type: SUBSCRIPTIONS.UPDATE_CUSTOMER_METHOD_SUCCESS,
    payload: {
      updatedHotel
    }
  };
};

export const updateCustomerMethodFailure = error => {
  if (!error) {
    throw new Error('updateCustomerMethodFailure requires an error argument');
  }
  return {
    type: SUBSCRIPTIONS.UPDATE_CUSTOMER_METHOD_FAILURE,
    payload: {
      error
    }
  };
};

// Asynchronous action creators

export const switchCustomerPlan = (hotelId, newPlan) => async dispatch => {
  dispatch({ type: SUBSCRIPTIONS.SWITCH_CUSTOMER_PLAN });
  dispatch({ type: SUBSCRIPTIONS.SWITCH_CUSTOMER_PLAN_STARTED });
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify(newPlan)
  };
  try {
    const result = await fetch(`${DOMAIN}${SUBSCRIPTION}/${hotelId}`, config);
    const jsonResult = await result.json();
    dispatch({ type: SUBSCRIPTIONS.SWITCH_CUSTOMER_PLAN_FINISHED });
    if (result.ok) {
      dispatch(switchCustomerPlanSuccess(jsonResult));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(switchCustomerPlanFailure(error));
  }
};

export const createNewCustomer = (
  hotelId,
  enhancedStripeToken
) => async dispatch => {
  dispatch({ type: SUBSCRIPTIONS.CREATE_NEW_CUSTOMER });
  dispatch({ type: SUBSCRIPTIONS.CREATE_NEW_CUSTOMER_STARTED });
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify(enhancedStripeToken)
  };
  try {
    const result = await fetch(`${DOMAIN}${SUBSCRIPTION}/${hotelId}`, config);
    const jsonResult = await result.json();
    dispatch({ type: SUBSCRIPTIONS.CREATE_NEW_CUSTOMER_FINISHED });
    if (result.ok) {
      dispatch(creatNewCustomerSuccess(jsonResult));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(createNewCustomerFailure(error));
  }
};

export const updateCustomerMethod = (
  hotelId,
  enhancedStripeToken
) => async dispatch => {
  dispatch({ type: SUBSCRIPTIONS.UPDATE_CUSTOMER_METHOD });
  dispatch({ type: SUBSCRIPTIONS.UPDATE_CUSTOMER_METHOD_STARTED });
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify(enhancedStripeToken)
  };
  try {
    const result = await fetch(`${DOMAIN}${METHOD}/${hotelId}`, config);
    const jsonResult = await result.json();
    dispatch({ type: SUBSCRIPTIONS.UPDATE_CUSTOMER_METHOD_FINISHED });
    if (result.ok) {
      dispatch(updateCustomerMethodSuccess(jsonResult));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(updateCustomerMethodFailure(error));
  }
};
