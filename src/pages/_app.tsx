import type { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { useApollo } from '~/lib/apolloClient';
import { wrapper } from '~/redux/store';

import ModalProvider from '~/contexts/ModalContext';

// styles
import '../styles/index.scss';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </ApolloProvider>
  );
}

export default wrapper.withRedux(MyApp);
