import { useState } from 'react';

import clsx from 'clsx';

import { PostFragment, useCreateCommentMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { commentActions } from '~/redux/slices/commentSlice';
import { postActions } from '~/redux/slices/postSlice';

import PostBody from './PostBody';
import PostHeader from './PostHeader';
import PostPhoto from './PostPhoto';
import CommentField from '../CommentField';

const PostFragment = (props: PostFragment) => {
  const { _id: postId } = props;

  const [caption, setCaption] = useState<string>('');

  const [createComment] = useCreateCommentMutation();
  const dispatch = useStoreDispatch();

  const handleCreateComment = async () => {
    const response = await createComment({
      variables: {
        caption,
        postId,
      },
    });

    const data = response.data?.createComment;

    if (data?.success && data.comment) {
      dispatch(
        postActions.increaseCommentCounts({
          postId,
        }),
      );
      setCaption('');

      dispatch(commentActions.addNewComment({ postId, comment: data.comment }));
    }
  };

  return (
    <div className={clsx('border-1 border-line', 'bg-white')}>
      <PostHeader {...props} />
      <PostPhoto {...props} />
      <PostBody {...props} />
      <CommentField onSubmit={handleCreateComment} caption={caption} onSetCaption={setCaption} />
    </div>
  );
};

export default PostFragment;
