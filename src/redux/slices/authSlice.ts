import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// types
import { AuthSliceState, FollowUserReducer } from '../types/auth';
import { FollowType, UserFragment } from '~/types/generated';

const initialState: AuthSliceState = {
  currentUser: null,
  selectedUser: null,
  suggestedUsers: [],
};

export const authSlice = createSlice({
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

      const handleMeWithFollowers = (user: UserFragment) => {
        if (followType === FollowType.Follow) user.followers.push(currentUser);
        else
          user.followers = user.followers.filter(
            (followedUser) => followedUser._id !== currentUser._id,
          );
      };

      // Handle follow of profile page
      if (state.selectedUser != null) handleMeWithFollowers(state.selectedUser);

      for (const suggestedUser of state.suggestedUsers) {
        if (suggestedUser._id === user._id) {
          handleMeWithFollowers(suggestedUser);

          break;
        }
      }
    },

    addFetchedSuggestedUsers: (state, action: PayloadAction<UserFragment[]>) => {
      state.suggestedUsers.push(...action.payload);
    },

    setSelectedUser: (state, action: PayloadAction<UserFragment>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.auth,
    }),
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
