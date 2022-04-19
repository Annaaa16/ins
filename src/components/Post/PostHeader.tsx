import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { Post } from '~/types/generated';
import { postActions } from '~/redux/slices/postSlice';
import { useStoreDispatch } from '~/redux/store';

import avatar from '~/assets/avatar.png';

import Skeleton from '../Skeleton';

const PostHeader = (props: Post) => {
  const { user } = props;

  const { showModal } = useModalContext();

  const dispatch = useStoreDispatch();

  return (
    <div className='flex-between py-3 px-4'>
      <div className='flex items-center'>
        <Skeleton rounded className='w-8 h-8 mr-3' src={user.avatar ?? avatar.src} alt='Avatar' />
        <span className={clsx('text-sm font-medium')}>{user.username}</span>
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
