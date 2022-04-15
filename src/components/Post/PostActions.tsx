import clsx from 'clsx';

import IconComment from '../Icon/IconComment';
import IconHeart from '../Icon/IconHeart';
import IconSave from '../Icon/IconSave';
import IconShare from '../Icon/IconShare';

const PostActions = () => {
  return (
    <div className={clsx('flex-between')}>
      <div className={clsx('flex items-center gap-x-3')}>
        <IconHeart className={clsx('cursor-pointer')} active={false} />
        <IconComment className={clsx('cursor-pointer')} />
        <IconShare className={clsx('cursor-pointer')} />
      </div>
      <IconSave className={clsx('cursor-pointer')} />
    </div>
  );
};

export default PostActions;
