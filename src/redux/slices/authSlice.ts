import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { AuthSliceState } from '../types/auth';
import { User } from '~/types/generated';

const initialState: AuthSliceState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
