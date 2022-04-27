import { CommentFragment, ReactionType, useReactCommentMutation } from '~/types/generated';
import { useAuthSelector } from '~/redux/selectors';
import { commentActions } from '~/redux/slices/commentSlice';
import { useStoreDispatch } from '~/redux/store';

export const useComment = (comment: CommentFragment, postId: string) => {
  const { currentUser } = useAuthSelector();

  const [reactCommentMutate] = useReactCommentMutation();
  const dispatch = useStoreDispatch();

  let isLiked = false;
  let reactComment = () => {};

  if (currentUser == null) return { isLiked, reactComment };

  isLiked = comment.reactions.some((reactedUser) => reactedUser._id === currentUser._id);

  reactComment = () => {
    if (typeof isLiked === 'undefined' || currentUser == null) return;

    const reactionType = isLiked ? ReactionType.Unlike : ReactionType.Like;

    dispatch(
      commentActions.reactComment({
        commentId: comment._id,
        reaction: reactionType,
        postId: postId,
        currentUser,
      }),
    );

    reactCommentMutate({
      variables: {
        commentId: comment._id,
        reaction: reactionType,
      },
    });
  };

  return { isLiked, reactComment };
};
