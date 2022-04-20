import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import {
  CurrentAction,
  DeletePostReducer,
  InitPostStateReducer,
  PostSliceState,
  ReactPostReducer,
} from '../types/post';

import { Post, ReactionType } from '~/types/generated';

const initialState: PostSliceState = {
  posts: [],
  cursor: null,
  selectedPost: null,
  currentAction: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addNewPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },

    updatePost: (state, { payload: updatedPost }: PayloadAction<Post>) => {
      state.posts = state.posts.map((post) => (post._id === updatedPost._id ? updatedPost : post));
    },

    initPostState: (state, action: PayloadAction<InitPostStateReducer>) => {
      state.posts.push(...action.payload.posts);
    },

    reactPost: (state, { payload }: PayloadAction<ReactPostReducer>) => {
      const { postId, currentUser, reaction } = payload;

      state.posts.forEach((post) => {
        if (post._id !== postId) return;

        if (reaction === ReactionType.Like) post.reactions.push(currentUser);
        else
          post.reactions = post.reactions.filter(
            (reactedUser) => reactedUser._id !== currentUser._id,
          );
      });
    },

    deletePost: (state, { payload }: PayloadAction<DeletePostReducer>) => {
      state.posts = state.posts.filter((post) => post._id !== payload.postId);
    },

    // Selected to implement actions
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },

    setCurrentAction: (state, action: PayloadAction<CurrentAction>) => {
      state.currentAction = action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
