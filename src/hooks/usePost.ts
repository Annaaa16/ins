import { Post, ReactionType, useReactPostMutation } from '~/types/generated';

import { useAuthSelector, usePostSelector } from '~/redux/selectors';
import { postActions } from '~/redux/slices/postSlice';
import { useStoreDispatch } from '~/redux/store';

export const usePost = ({ _id: postId }: Post) => {
  const { posts } = usePostSelector();
  const { currentUser } = useAuthSelector();

  const [reactPostMutate] = useReactPostMutation();
  const dispatch = useStoreDispatch();

  const isLiked = posts
    .find((post) => post._id === postId)
    ?.reactions.some((reaction) => reaction._id === currentUser?._id);

  const reactPost = () => {
    if (typeof isLiked === 'undefined' || !currentUser) return;

    const reactionType = isLiked ? ReactionType.Unlike : ReactionType.Like;

    dispatch(
      postActions.reactPost({
        postId,
        currentUser,
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
