// types
import { FollowType, UserFragment } from '~/types/generated';

export interface AuthSliceState {
  currentUser: UserFragment | null;
}

export interface FollowUserReducer {
  user: UserFragment;
  followType: FollowType;
}
