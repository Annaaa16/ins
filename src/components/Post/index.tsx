import clsx from 'clsx';

import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostPhoto from './PostPhoto';

const Post = () => {
  return (
    <div className={clsx('border-1 border-line', 'bg-white')}>
      <PostHeader />
      <PostPhoto />
      <PostBody />
      <PostFooter />
    </div>
  );
};

export default Post;
