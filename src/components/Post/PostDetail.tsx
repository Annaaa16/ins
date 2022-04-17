import clsx from 'clsx';

// import TimeAgo from 'react-timeago';
import { displayLikeCounts } from '~/helpers/format';

import { Post } from '~/types/generated';

const PostDetail = ({ user, reactions, caption }: Post) => {
  return (
    <div className='flex flex-col gap-y-2 text-sm-1 mt-5'>
      <span className={clsx('font-medium', 'cursor-pointer select-none')}>
        {displayLikeCounts(reactions, 'like')}
      </span>
      <div className='select-none'>
        <span className={clsx('font-medium', 'cursor-pointer')}>{user.username}</span>{' '}
        <span>{caption}</span>
      </div>
      <span className={clsx('text-base-gray', 'cursor-pointer select-none')}>
        View all 1,207 comments
      </span>
      {/* <TimeAgo
        live={false}
        className={clsx('uppercase text-xs-1', 'text-base-gray', 'cursor-pointer select-none')}
        date={updatedAt}
      /> */}
    </div>
  );
};

export default PostDetail;
