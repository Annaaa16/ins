import clsx from 'clsx';

import { Post } from '~/types/generated';

import avatar from '~/assets/avatar.png';
import Skeleton from '../Skeleton';

const PostHeader = ({ user }: Post) => {
  return (
    <div className='flex items-center py-3 px-4'>
      <Skeleton rounded className='w-8 h-8 mr-3' src={user.avatar ?? avatar.src} alt='Avatar' />
      <span className={clsx('text-sm font-medium')}>{user.username}</span>
    </div>
  );
};

export default PostHeader;
