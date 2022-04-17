import { Post } from '~/types/generated';

import PostActions from './PostActions';
import PostDetail from './PostDetail';

const PostBody = (props: Post) => {
  return (
    <div className='px-4 pt-4 pb-3'>
      <PostActions {...props} />
      <PostDetail {...props} />
    </div>
  );
};

export default PostBody;
