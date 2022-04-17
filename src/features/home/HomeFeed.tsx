import Post from '~/components/Post';

import { usePostSelector } from '~/redux/selectors';

const HomeFeed = () => {
  const { posts } = usePostSelector();

  return (
    <section className='col-span-2 pb-10 space-y-10'>
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </section>
  );
};

export default HomeFeed;
