import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import {
  AddCommentsReducer,
  AddNewCommentReducer,
  CommentSliceState,
  ReactCommentReducer,
} from '../types/comment';
import { CommentFragment, ReactionType } from '~/types/generated';

const initialState: CommentSliceState = {
  comments: {},
  selectedComment: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addNewComment: (
      state,
      { payload: { postId, comment } }: PayloadAction<AddNewCommentReducer>,
    ) => {
      if (state.comments[postId] == null)
        state.comments[postId] = {
          data: [],
          cursor: null,
          hasMore: true, // Init to true so first request can made when open modal post detail
          commentsPerPost: [],
        };

      // Avoid duplicate comment when making the first request
      if (state.comments[postId].data.length > 0) state.comments[postId].data.unshift(comment);

      state.comments[postId].commentsPerPost.unshift(comment);
    },

    addFetchedComments: (
      state,
      { payload: { postId, comments, cursor, hasMore } }: PayloadAction<AddCommentsReducer>,
    ) => {
      if (state.comments[postId] == null)
        state.comments[postId] = {
          data: [],
          cursor: null,
          hasMore: false,
          commentsPerPost: [],
        };

      state.comments[postId].data.push(...comments);
      state.comments[postId].cursor = cursor;
      state.comments[postId].hasMore = hasMore;
    },

    deleteComment: (state, { payload }: PayloadAction<CommentFragment>) => {
      const comment = state.comments[payload.postId];

      const filterComments = (comments: CommentFragment[]) =>
        comments.filter((comment) => comment._id !== payload._id);

      comment.data = filterComments(comment.data);
      comment.commentsPerPost = filterComments(comment.commentsPerPost);
    },

    reactComment: (
      state,
      { payload: { currentUser, postId, commentId, reaction } }: PayloadAction<ReactCommentReducer>,
    ) => {
      if (state.comments[postId] == null) return;

      const handleReactComment = (comments: CommentFragment[]) => {
        comments.forEach((comment) => {
          if (comment._id !== commentId) return;

          if (reaction === ReactionType.Like) comment.reactions.push(currentUser);
          else
            comment.reactions = comment.reactions.filter(
              (reactedUser) => reactedUser._id !== currentUser._id,
            );
        });
      };

      handleReactComment(state.comments[postId].data);
      handleReactComment(state.comments[postId].commentsPerPost);
    },

    // Selected to implement actions
    setSelectedComment: (state, action: PayloadAction<CommentFragment | null>) => {
      state.selectedComment = action.payload;
    },
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice.reducer;
