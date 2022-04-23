import { Comment, ReactionType, User } from '~/types/generated';

interface CommentPerPost {
  [postId: string]: {
    data: Comment[];
    commentsPerPost: Comment[];
    cursor: string | null;
    hasMore: boolean;
  };
}

export interface CommentSliceState {
  comments: CommentPerPost;
  selectedComment: Comment | null;
}

export interface AddNewCommentReducer {
  postId: string;
  comment: Comment;
}

export interface AddCommentsReducer {
  postId: string;
  comments: Comment[];
  cursor: string | null;
  hasMore: boolean;
}

export interface ReactCommentReducer {
  currentUser: User;
  postId: string;
  commentId: string;
  reaction: ReactionType;
}
