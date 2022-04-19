// types
import { Post, ReactionType, User } from '~/types/generated';

export interface PostSliceState {
  selectedPost: Post | null;
  posts: Post[];
  cursor: string | null;
}

export interface InitPostStateReducer {
  posts: Post[];
  cursor?: string | null;
}

export interface ReactPostReducer {
  currentUser: User;
  postId: string;
  reaction: ReactionType;
}

export interface DeletePostReducer {
  postId: string;
}
