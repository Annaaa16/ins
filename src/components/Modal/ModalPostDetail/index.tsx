import { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { LIMITS } from '~/constants';
import { useCreateCommentMutation, useGetCommentsLazyQuery } from '~/types/generated';
import { useAuthSelector, useCommentSelector, usePostSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';
import { useFollowUser, useIntersectionObserver } from '~/hooks';
import { commentActions } from '~/redux/slices/commentSlice';
import { postActions } from '~/redux/slices/postSlice';
import { displayLikeCounts } from '~/helpers/format';

import { SpinnerRing } from '~/components/Spinner';
import Skeleton from '~/components/Skeleton';
import Actions from '~/components/Actions';
import CommentField from '~/components/CommentField';
import DetailComment from './DetailComment';
import ModalWrapper from '../ModalWrapper';

import avatar from '~/assets/avatar.png';

const ModalPostDetail = () => {
  const [caption, setCaption] = useState<string>('');

  // Fix duplicate requests
  const calledCursorsRef = useRef<Array<string | null>>([]);

  const { showModal } = useModalContext();
  const { selectedPost } = usePostSelector();
  const { comments } = useCommentSelector();
  const currentUser = useAuthSelector().currentUser!;

  const [getComments, { loading: getCommentsLoading }] = useGetCommentsLazyQuery();
  const [createComment, { loading: createCommentLoading }] = useCreateCommentMutation();
  const { observerRef, containerObserverRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '300px',
  });
  const dispatch = useStoreDispatch();

  const { _id: postId, user, photo: postPhoto, reactions, caption: postCaption } = selectedPost!;

  const { isFollowed, followUserLoading, handleFollowActions } = useFollowUser(user);
  const hasFollowBtn = !isFollowed && currentUser._id !== user._id;

  const {
    cursor: commentsCursor = null,
    data: commentsData = [],
    hasMore: hasMoreComments = true, // Init to true to make first request when opening modal post detail
  } = comments[postId] ?? {};

  const handleCreateComment = async () => {
    if (createCommentLoading) return;

    const response = await createComment({
      variables: {
        caption,
        postId,
      },
    });

    const data = response.data?.createComment;

    if (data?.success && data.comment) {
      dispatch(
        commentActions.addNewComment({
          postId,
          comment: data.comment,
        }),
      );
      dispatch(postActions.increaseCommentCounts({ postId }));
      setCaption('');
    }
  };

  // Fetch comments
  useEffect(() => {
    if (
      !isIntersecting ||
      !hasMoreComments ||
      getCommentsLoading ||
      calledCursorsRef.current.includes(commentsCursor)
    )
      return;

    calledCursorsRef.current.push(commentsCursor);

    (async () => {
      const response = await getComments({
        variables: {
          limit: LIMITS.COMMENTS,
          cursor: commentsCursor,
          postId,
        },
      });

      const data = response.data?.getComments;

      if (data?.success) {
        dispatch(
          commentActions.addFetchedComments({
            postId,
            comments: data.comments!,
            cursor: data?.cursor ?? null,
            hasMore: !!data.hasMore,
          }),
        );
      }
    })();
  }, [
    commentsCursor,
    hasMoreComments,
    getCommentsLoading,
    isIntersecting,
    postId,
    dispatch,
    getComments,
  ]);

  return (
    <ModalWrapper
      modalType={MODAL_TYPES.POST_DETAIL}
      closeHandler={() => dispatch(postActions.setSelectedPost(null))}
      className={clsx(
        'flex lg:w-[1408px] max-w-[calc(100vw-30px)] lg:max-w-[calc(90vw-110px)] h-modal-post-detail-h-mobile lg:h-modal-post-detail-h',
      )}
    >
      {postPhoto != null && (
        <Skeleton
          objectFit='cover'
          className={clsx('hidden lg:block w-3/5 min-h-full border-r border-line', 'bg-white')}
          src={postPhoto}
        />
      )}

      <div
        className={clsx(
          'flex flex-col w-[calc(100vw-50px)] lg:w-2/5 text-sm-1 max-h-modal-post-detail-h-mobile lg:max-h-modal-post-detail-h',
          'bg-white',
        )}
      >
        <div className='flex items-center px-4 py-3 border-b border-line flex-shrink-0'>
          <Skeleton
            src={user.avatar ?? avatar.src}
            rounded
            className={clsx('w-8 h-8 mr-3', 'cursor-pointer')}
            objectFit='cover'
          />

          <span className={clsx('font-medium mr-3', 'cursor-pointer')}>{user.username}</span>

          {hasFollowBtn && (
            <button
              onClick={() => handleFollowActions()}
              className={clsx('btn', 'text-primary', 'cursor-pointer')}
            >
              {followUserLoading ? <SpinnerRing className='text-base-gray' /> : 'Follow'}
            </button>
          )}

          <button onClick={() => showModal(MODAL_TYPES.POST_ACTIONS)} className='btn ml-auto'>
            <FontAwesomeIcon className='text-lg' icon={faEllipsis} />
          </button>
        </div>

        <div ref={containerObserverRef} className='px-4 overflow-y-auto'>
          <div className='group flex items-center py-2'>
            <Skeleton
              src={user.avatar ?? avatar.src}
              rounded
              className={clsx('w-8 h-8 mr-3', 'cursor-pointer')}
              objectFit='cover'
            />
            <div className='leading-normal'>
              <span className={clsx('font-medium mr-1', 'cursor-pointer select-none')}>
                {user.username}
              </span>
              <p className='inline'>{postCaption}</p>
            </div>
          </div>
          {commentsData.map((comment) => (
            <DetailComment
              key={comment._id}
              postId={postId}
              comment={comment}
              onShowActionsModal={() => showModal(MODAL_TYPES.COMMENT_ACTIONS)}
            />
          ))}
          <div ref={observerRef} />
        </div>

        <div className='flex-shrink-0 mt-auto px-4 border-t border-line py-3'>
          <Actions post={selectedPost!} />

          <div className='mt-3'>
            {reactions.length === 0 ? (
              <span>
                Be the first to{' '}
                <span className={clsx('font-medium', 'cursor-pointer')}>like this</span>
              </span>
            ) : (
              <span className='font-medium'>{displayLikeCounts(reactions, 'like')}</span>
            )}
          </div>

          <div className={clsx('text-xs-1 mt-2', 'text-base-gray')}>4 DAYS AGO</div>
        </div>

        <CommentField
          loading={createCommentLoading}
          onSubmit={handleCreateComment}
          className='flex-shrink-0'
          caption={caption}
          onSetCaption={setCaption}
        />
      </div>
    </ModalWrapper>
  );
};

export default ModalPostDetail;
