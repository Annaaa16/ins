import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { FollowType, PostFragment, useFollowUserMutation } from '~/types/generated';
import { postActions } from '~/redux/slices/postSlice';
import { useStoreDispatch } from '~/redux/store';
import { useAuthSelector } from '~/redux/selectors';

import avatar from '~/assets/avatar.png';

import Skeleton from '../Skeleton';
import SpinnerRing from '../Spinner/SpinnerRing';
import { authActions } from '~/redux/slices/authSlice';

const PostHeader = (props: PostFragment) => {
  const { _id: postId, user } = props;

  const { showModal } = useModalContext();
  const { currentUser } = useAuthSelector();

  const [followUser, { loading: followLoading }] = useFollowUserMutation();

  const dispatch = useStoreDispatch();

  const isFollowed = user.followers.some((followedUser) => followedUser._id === currentUser?._id);
  const canFollow = !isFollowed && user._id !== currentUser?._id;

  const handleFollowUser = async () => {
    if (isFollowed) return;

    const followType = FollowType.Follow;

    const response = await followUser({
      variables: {
        userId: user._id,
        followType,
      },
    });

    if (!response.data?.followUser.success) return;

    dispatch(
      postActions.followUserByPost({
        postId,
        currentUser: currentUser!,
        followType,
      }),
    );

    dispatch(
      authActions.followUser({
        user,
        followType,
      }),
    );
  };

  return (
    <div className='flex-between py-3 px-4'>
      <div className='flex items-center'>
        <Skeleton rounded className='w-8 h-8 mr-3' src={user.avatar ?? avatar.src} alt='Avatar' />
        <span className={clsx('text-sm font-medium mr-3')}>{user.username}</span>
        {canFollow &&
          (followLoading ? (
            <SpinnerRing className='w-10 h-10' />
          ) : (
            <button onClick={handleFollowUser} className={clsx('btn text-sm-1', 'text-primary')}>
              Follow
            </button>
          ))}
      </div>
      <FontAwesomeIcon
        onClick={() => {
          showModal(MODAL_TYPES.POST_ACTIONS);
          dispatch(postActions.setSelectedPost(props));
        }}
        className='cursor-pointer'
        icon={faEllipsis}
      />
    </div>
  );
};

export default PostHeader;
