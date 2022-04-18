import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { Post, ReactionType } from '~/types/generated';
import { InitPostStateReducer, PostSliceState, ReactPostReducer } from '../types/post';

const initialState: PostSliceState = {
  posts: [],
  cursor: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addNewPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
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
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
