import { useEffect } from 'react';
import NextLink from 'next/link';

import { ROUTES } from '~/constants';
import { useGetSessionLazyQuery } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { authActions } from '~/redux/slices/authSlice';

import Header from '~/components/Header';
import Meta from '~/layouts/Meta';

const Custom404 = () => {
  const [getSession] = useGetSessionLazyQuery();
  const dispatch = useStoreDispatch();

  useEffect(() => {
    (async () => {
      const response = await getSession();

      const data = response.data?.getSession;

      if (data?.success) dispatch(authActions.setCurrentUser(data.user!));
    })();
  }, [getSession, dispatch]);

  return (
    <Meta title='Page Not Found'>
      <Header />
      <main className='mt-header-h text-center pt-12'>
        <h1 className='font-medium text-xl'>Sorry, this page isn&apos;t available.</h1>
        <p className='mt-8 text-base'>
          The link you followed may be broken, or the page may have been removed.{' '}
          <NextLink href={ROUTES.HOME}>
            <a className='text-primary'>Go back to Instagram</a>
          </NextLink>
          .
        </p>
      </main>
    </Meta>
  );
};

export default Custom404;
