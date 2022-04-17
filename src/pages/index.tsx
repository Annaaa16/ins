import type { GetServerSideProps, NextPage } from 'next';

import { LIMITS } from '~/constants';
import { GetPostsDocument, GetPostsQuery, GetPostsQueryVariables } from '~/types/generated';
import { wrapper } from '~/redux/store';
import { initializeApollo } from '~/lib/apolloClient';
import { withRoute } from '~/hocs';

import Header from '~/components/Header';
import HomeFeed from '~/features/home/HomeFeed';
import HomeWidget from '~/features/home/HomeWidget';
import DialogPostCreator from '~/components/Dialog/DialogPostCreator';
import { postActions } from '~/redux/slices/postSlice';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className='grid grid-cols-3 w-container-w mx-auto space-header'>
        <HomeFeed />
        <HomeWidget />
      </main>
      <DialogPostCreator />
    </>
  );
};

export default Home;

const propsWrapper = wrapper.getServerSideProps(({ dispatch }) => async (ctx) => {
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
});

export const getServerSideProps: GetServerSideProps = withRoute({ isProtected: true })(
  propsWrapper,
);
