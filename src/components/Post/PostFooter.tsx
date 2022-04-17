import clsx from 'clsx';

import { Post } from '~/types/generated';

import IconEmoji from '../Icon/IconEmoji';

const PostFooter = (_props: Post) => {
  return (
    <form className='flex items-center px-4 py-3 border-t-1 border-line'>
      <IconEmoji className={clsx('mr-4', 'cursor-pointer')} />
      <input
        className={clsx('text-sm', 'placeholder:text-base-gray')}
        placeholder='Add a comment...'
      />
      <button className={clsx('btn btn--disabled ml-auto text-sm', 'text-primary')}>Post</button>
    </form>
  );
};

export default PostFooter;
