import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import postReducer from './slices/postSlice';
import modalReducer from './slices/modalSlice';
import authReducer from './slices/authSlice';

export const combinedReducers = combineReducers({
  post: postReducer,
  modal: modalReducer,
  auth: authReducer,
});

const rootReducer = (state: ReturnType<typeof combinedReducers>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

export default rootReducer;
