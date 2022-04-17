import clsx from 'clsx';

import { Post } from '~/types/generated';

import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostPhoto from './PostPhoto';

const Post = (props: Post) => {
  return (
    <div className={clsx('border-1 border-line', 'bg-white')}>
      <PostHeader {...props} />
      <PostPhoto {...props} />
      <PostBody {...props} />
      <PostFooter {...props} />
    </div>
  );
};

export default Post;
