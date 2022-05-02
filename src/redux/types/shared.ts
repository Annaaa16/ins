import { UserFragment } from '~/types/generated';

export type UserWithOnlineStatus = Omit<UserFragment, 'followers' | 'following'> & {
  isOnline?: boolean;
};
