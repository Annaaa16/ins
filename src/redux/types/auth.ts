// types
import { FollowType, UserFragment } from '~/types/generated';

export interface AuthSliceState {
  currentUser: UserFragment | null;
  selectedUser: UserFragment | null;
  suggestedUsers: UserFragment[];
}

export interface FollowUserReducer {
  user: UserFragment;
  followType: FollowType;
}
