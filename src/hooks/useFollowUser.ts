// types
import { Callback, FollowAction } from '~/types/utils';

import { FollowType, useFollowUserMutation, UserFragment } from '~/types/generated';
import { useAuthSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';
import { postActions } from '~/redux/slices/postSlice';
import { authActions } from '~/redux/slices/authSlice';

type FollowUser = (action: FollowAction, actionDone?: Callback) => Promise<void>;

interface UseFollowUserReturn {
  isFollowed: boolean;
  canFollow: boolean;
  followUserLoading: boolean;
  currentUser: UserFragment;
  followUser: FollowUser;
}

export const useFollowUser = (selectedUser: UserFragment, postId?: string): UseFollowUserReturn => {
  const currentUser = useAuthSelector().currentUser!;

  const [followUserMutate, { loading: followUserLoading }] = useFollowUserMutation();
  const dispatch = useStoreDispatch();

  const isFollowed = selectedUser.followers.some((follower) => follower._id === currentUser._id);
  const canFollow = !isFollowed && postId !== currentUser._id;

  const followUser: FollowUser = async (action, actionDone) => {
    if (followUserLoading) return;

    const followType = action === 'follow' ? FollowType.Follow : FollowType.Unfollow;

    const response = await followUserMutate({
      variables: {
        followType,
        userId: selectedUser._id,
      },
    });

    if (!response.data?.followUser.success) return;

    if (actionDone != null) actionDone();

    dispatch(
      authActions.followUser({
        user: selectedUser,
        followType,
      }),
    );

    if (postId != null)
      dispatch(
        postActions.followUserByPost({
          postId,
          currentUser: currentUser,
          followType,
        }),
      );
  };

  return { isFollowed, canFollow, followUserLoading, currentUser, followUser };
};
