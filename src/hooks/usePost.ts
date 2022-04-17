import { Post, ReactionType, useReactPostMutation } from '~/types/generated';

import { usePostSelector } from '~/redux/selectors';
import { postActions } from '~/redux/slices/postSlice';
import { useStoreDispatch } from '~/redux/store';

export const usePost = ({ _id: postId, user }: Post) => {
  const currentUser = { _id: '62541609383d3ff596d8e8c1' };

  const [reactPostMutate] = useReactPostMutation();
  const { posts } = usePostSelector();

  const dispatch = useStoreDispatch();

  const isLiked = posts
    .find((post) => post._id === postId)
    ?.reactions.some((reaction) => reaction._id === currentUser._id);

  const reactPost = () => {
    if (typeof isLiked === 'undefined') return;

    const reactionType = isLiked ? ReactionType.Unlike : ReactionType.Like;

    dispatch(
      postActions.reactPost({
        postId,
        user,
        reaction: reactionType,
      }),
    );

    reactPostMutate({
      variables: {
        postId,
        reaction: reactionType,
      },
    });
  };

  return { isLiked, reactPost };
};
