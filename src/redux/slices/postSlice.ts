import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { Post } from '~/types/generated';
import { PostSliceState } from '../types';

const initialState: PostSliceState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addNewPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
