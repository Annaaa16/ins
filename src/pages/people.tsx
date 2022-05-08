import { GetServerSideProps } from 'next';

import clsx from 'clsx';

import {
  GetSuggestionsDocument,
  GetSuggestionsQuery,
  GetSuggestionsQueryVariables,
} from '~/types/generated';
import { LIMITS } from '~/constants';
import { withRoute } from '~/hocs';
import { initializeApollo } from '~/lib/apolloClient';
import { authActions } from '~/redux/slices/authSlice';
import { useAuthSelector } from '~/redux/selectors';

import Header from '~/components/Header';
import Meta from '~/layouts/Meta';
import PeopleItem from '~/features/people/PeopleItem';
import PeopleEmpty from '~/features/people/PeopleEmpty';

const People = () => {
  const { suggestedUsers } = useAuthSelector();

  let body = null;

  if (suggestedUsers.length === 0) body = <PeopleEmpty />;
  else
    body = (
      <>
        <h1 className='font-medium text-base pl-4'>Suggested</h1>
        <ul className={clsx('text-sm-1 p-4 mt-2 wrapper-border space-y-4')}>
          {suggestedUsers.map((user) => (
            <PeopleItem key={user._id} user={user} />
          ))}
        </ul>
      </>
    );

  return (
    <Meta title='Instagram'>
      <Header />
      <main className='w-container-w mx-auto px-32 mt-header-h pt-10'>{body}</main>
    </Meta>
  );
};

export default People;

export const getServerSideProps: GetServerSideProps = withRoute({ isProtected: true })(
  async (ctx, dispatch) => {
    const client = initializeApollo({ headers: ctx.req.headers });

    const response = await client.query<GetSuggestionsQuery, GetSuggestionsQueryVariables>({
      query: GetSuggestionsDocument,
      variables: {
        limit: LIMITS.SUGGESTED_PEOPLE,
        cursor: null,
      },
    });

    const data = response.data.getSuggestions;

    if (!data.success)
      return {
        props: {},
      };

    dispatch(authActions.addFetchedSuggestedUsers(data.users!));

    return {
      props: {},
    };
  },
);
