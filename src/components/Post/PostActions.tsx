import clsx from 'clsx';

import { Post } from '~/types/generated';
import { usePost } from '~/hooks';

import IconComment from '../Icon/IconComment';
import IconHeart from '../Icon/IconHeart';
import IconSave from '../Icon/IconSave';
import IconShare from '../Icon/IconShare';

const PostActions = (props: Post) => {
  const { isLiked, reactPost } = usePost(props);

  return (
    <div className={clsx('flex-between')}>
      <div className={clsx('flex items-center gap-x-3')}>
        <IconHeart onClick={reactPost} className={clsx('cursor-pointer')} active={isLiked} />
        <IconComment className={clsx('cursor-pointer')} />
        <IconShare className={clsx('cursor-pointer')} />
      </div>
      <IconSave className={clsx('cursor-pointer')} />
    </div>
  );
};

export default PostActions;
