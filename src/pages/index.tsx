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
      <main className='grid grid-cols-3 w-container-w mx-auto space-header'>
        <HomeFeed />
        <HomeWidget />
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
        page: LIMITS.POSTS,
        cursor: '',
      },
    });

    const data = response.data.getPosts;

    if (data.success && data.posts)
      dispatch(
        postActions.initPostState({
          cursor: data.cursor,
          posts: data.posts,
        }),
      );

    return {
      props: {},
    };
  },
);
