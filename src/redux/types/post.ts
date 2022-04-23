// types
import { Post, ReactionType, User } from '~/types/generated';

export type CurrentAction = 'create' | 'update' | 'delete' | null;

export interface PostSliceState {
  selectedPost: Post | null;
  posts: Post[];
  cursor: string | null;
  currentAction: CurrentAction;
}

export interface ReactPostReducer {
  currentUser: User;
  postId: string;
  reaction: ReactionType;
}

export interface DeletePostReducer {
  postId: string;
}

export interface AddFetchedPostsReducer {
  posts: Post[];
  cursor: string | null;
}

export interface IncreaseCommentCountsReducer {
  postId: string;
}
