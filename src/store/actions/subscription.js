import { DOMAIN, SUBSCRIPTION } from '../../utils/paths';
import {
  SWITCH_CUSTOMER_PLAN,
  SWITCH_CUSTOMER_PLAN_SUCCESS,
  SWITCH_CUSTOMER_PLAN_FAILURE,
  CREATE_NEW_CUSTOMER,
  CREATE_NEW_CUSTOMER_SUCCESS,
  CREATE_NEW_CUSTOMER_FAILURE,
} from './actionTypes';

// Synchronous action creators

export const switchCustomerPlanSuccess = updatedHotel => {
  if (!updatedHotel) {
    throw new Error(
      'switchCustomerPlanSuccess requires an updatedHotel argument',
    );
  }
  return {
    type: SWITCH_CUSTOMER_PLAN_SUCCESS,
    payload: {
      updatedHotel,
    },
  };
};

export const switchCustomerPlanFailure = error => {
  if (!error) {
    throw new Error('switchCustomerPlanSuccess requires an error argument');
  }
  return {
    type: SWITCH_CUSTOMER_PLAN_FAILURE,
    payload: {
      error,
    },
  };
};

// Asynchronous action creators

export const switchCustomerPlan = (hotelId, planId) => async dispatch => {
  dispatch({ type: SWITCH_CUSTOMER_PLAN });
  const newPlan = {
    newPlan: planId,
  };
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPlan),
  };
  try {
    const result = await fetch(`${DOMAIN}${SUBSCRIPTION}/${hotelId}`, config);
    const jsonResult = await result.json();
    if (result.ok) {
      dispatch(switchCustomerPlanSuccess(jsonResult));
    } else {
      throw new Error(jsonResult.message);
    }
  } catch (error) {
    dispatch(switchCustomerPlanFailure(error));
  }
};

