import type { GetServerSideProps, NextPage } from 'next';

import { LIMITS } from '~/constants';
import { GetPostsDocument, GetPostsQuery, GetPostsQueryVariables } from '~/types/generated';
import { initializeApollo } from '~/lib/apolloClient';
import { postActions } from '~/redux/slices/postSlice';
import { withRoute } from '~/hocs';

import Header from '~/components/Header';
import HomeFeed from '~/features/home/HomeFeed';
import HomeWidget from '~/features/home/HomeWidget';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className='grid grid-cols-3 w-container-w mx-auto mt-header-h pt-7'>
        <section className='col-span-2 pb-10 space-y-10'>
          <HomeFeed />
        </section>
        <section className='pl-5 pt-4'>
          <HomeWidget />
        </section>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = withRoute({ isProtected: true })(
  async (ctx, dispatch) => {
    const client = initializeApollo({ headers: ctx?.req?.headers });

    const response = await client.query<GetPostsQuery, GetPostsQueryVariables>({
      query: GetPostsDocument,
      variables: {
        limit: LIMITS.POSTS,
        cursor: null,
      },
    });

    const data = response.data.getPosts;

    if (data.success && data.posts)
      dispatch(
        postActions.addFetchedPosts({
          cursor: data.cursor ?? null,
          posts: data.posts,
        }),
      );

    return {
      props: {},
    };
  },
);
