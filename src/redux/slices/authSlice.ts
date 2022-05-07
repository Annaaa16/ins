import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { AuthSliceState, FollowUserReducer } from '../types/auth';
import { FollowType, UserFragment } from '~/types/generated';

const initialState: AuthSliceState = {
  currentUser: null,
  selectedUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserFragment>) => {
      state.currentUser = action.payload;
    },

    followUser: (state, { payload: { user, followType } }: PayloadAction<FollowUserReducer>) => {
      const currentUser = state.currentUser;

      if (currentUser == null) return;

      if (followType === FollowType.Follow) currentUser.following.push(user);
      else
        currentUser.following = currentUser.following.filter(
          (followingUser) => followingUser._id !== user._id,
        );

      // Handle follow of profile page
      if (state.selectedUser != null)
        if (followType === FollowType.Follow) state.selectedUser.followers.push(currentUser);
        else
          state.selectedUser.followers = state.selectedUser.followers.filter(
            (followedUser) => followedUser._id !== currentUser._id,
          );
    },

    setSelectedUser: (state, action: PayloadAction<UserFragment>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
