import { Post, ReactionType, useReactPostMutation } from '~/types/generated';

import { useAuthSelector } from '~/redux/selectors';
import { postActions } from '~/redux/slices/postSlice';
import { useStoreDispatch } from '~/redux/store';

export const usePost = (post: Post) => {
  const { currentUser } = useAuthSelector();

  const [reactPostMutate] = useReactPostMutation();
  const dispatch = useStoreDispatch();

  const isLiked = post.reactions.some((reaction) => reaction._id === currentUser?._id);

  const reactPost = () => {
    if (typeof isLiked === 'undefined' || !currentUser) return;

    const reactionType = isLiked ? ReactionType.Unlike : ReactionType.Like;

    dispatch(
      postActions.reactPost({
        postId: post._id,
        currentUser,
        reaction: reactionType,
      }),
    );

    reactPostMutate({
      variables: {
        postId: post._id,
        reaction: reactionType,
      },
    });
  };

  return { isLiked, reactPost };
};
