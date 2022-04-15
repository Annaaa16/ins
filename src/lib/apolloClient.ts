import { useMemo } from 'react';

import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { IncomingHttpHeaders } from 'http';
import isEqual from 'lodash/isEqual';
import merge from 'deepmerge';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

interface ApolloStateProps {
  [APOLLO_STATE_PROP_NAME]: NormalizedCacheObject;
}

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  const enhancedFetch = async (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        'Access-Control-Allow-Origin': '*',
        // Here we pass the cookie along for each request
        Cookie: headers?.cookie ?? '',
      },
    }).then((response) => response);
  };

  return new ApolloClient({
    // SSR only for Node.js
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
      fetchOptions: {
        mode: 'cors',
      },
      credentials: 'include',
      fetch: enhancedFetch,
    }),
    cache: new InMemoryCache(),
  });
};

interface InitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: NormalizedCacheObject | null;
}

export const initializeApollo = (
  { headers, initialState }: InitializeApollo = {
    headers: null,
    initialState: null,
  },
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // Combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: { props: ApolloStateProps },
) => {
  if (pageProps?.props) pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
};

export const useApollo = (pageProps: ApolloStateProps) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo({ initialState: state }), [state]);

  return store;
};
1;
