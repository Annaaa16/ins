// types
import { Post, ReactionType, User } from '~/types/generated';

export interface PostSliceState {
  posts: Post[];
  cursor: string | null;
}

export interface InitPostStateReducer {
  posts: Post[];
  cursor?: string | null;
}

export interface ReactPostReducer {
  user: User;
  postId: string;
  reaction: ReactionType;
}
