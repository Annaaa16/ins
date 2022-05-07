import { GetServerSideProps } from 'next';

import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
} from '~/types/generated';
import { LIMITS } from '~/constants';
import { withRoute } from '~/hocs';
import { initializeApollo } from '~/lib/apolloClient';
import { postActions } from '~/redux/slices/postSlice';
import { authActions } from '~/redux/slices/authSlice';
import { useAuthSelector } from '~/redux/selectors';

import Header from '~/components/Header';
import Meta from '~/layouts/Meta';
import ProfilePosts from '~/features/profile/ProfilePosts';
import ProfileDetail from '~/features/profile/ProfileDetail';

interface ProfileProps {
  postCounts: number;
}

const Profile = ({ postCounts }: ProfileProps) => {
  const selectedUser = useAuthSelector().selectedUser!;

  return (
    <Meta title={selectedUser!.username}>
      <Header />
      <main className={clsx('w-container-w mt-header-h pt-9 mx-auto pb-20')}>
        <section className='grid grid-cols-3'>
          <ProfileDetail user={selectedUser} postCounts={postCounts} />
        </section>

        <section className='mt-14 border-t border-line'>
          <div className='flex-center gap-x-16'>
            <button
              className={clsx(
                'relative',
                'btn flex items-center -mt-[1px] pt-3 rounded-none border-t border-base-black',
              )}
            >
              <FontAwesomeIcon icon={faBorderAll} className={clsx('mr-1.5 w-3.5')} />
              <span className={clsx('text-sm font-medium')}>Posts</span>
            </button>
          </div>
          <ProfilePosts userId={selectedUser!._id} />
        </section>
      </main>
    </Meta>
  );
};

export default Profile;

// TODO: Navigate to 404 page when request failed
export const getServerSideProps: GetServerSideProps = withRoute({ isProtected: true })(
  async (ctx, dispatch) => {
    const client = initializeApollo({ headers: ctx.req.headers });

    const username = ctx.query.username as string;

    const {
      data: { getProfile },
    } = await client.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: {
        username,
      },
    });

    if (!getProfile.success)
      return {
        props: {},
      };

    const {
      data: { getPosts },
    } = await client.query<GetPostsQuery, GetPostsQueryVariables>({
      query: GetPostsDocument,
      variables: {
        limit: LIMITS.POSTS,
        cursor: null,
        query: {
          field: 'user',
          value: getProfile.user!._id,
        },
      },
    });

    if (!getPosts.success)
      return {
        props: {},
      };

    dispatch(
      postActions.addFetchedPosts({
        cursor: getPosts.cursor ?? null,
        posts: getPosts.posts!,
      }),
    );

    dispatch(authActions.setSelectedUser(getProfile.user!));

    return {
      props: {
        postCounts: getProfile.postCounts,
      },
    };
  },
);
