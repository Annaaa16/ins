import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { AuthSliceState, FollowUserReducer } from '../types/auth';
import { FollowType, UserFragment } from '~/types/generated';

const initialState: AuthSliceState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserFragment>) => {
      state.currentUser = action.payload;
    },

    followUser: (state, { payload: { user, followType } }: PayloadAction<FollowUserReducer>) => {
      if (state.currentUser == null) return;

      if (followType === FollowType.Follow) state.currentUser.following.push(user);
      else
        state.currentUser.following = state.currentUser.following.filter(
          (followingUser) => followingUser._id !== user._id,
        );
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
