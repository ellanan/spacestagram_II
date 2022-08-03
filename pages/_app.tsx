import { AppProps } from 'next/app';
import React from 'react';

import { Layout } from '../components/Layout';
import '../styles/global.css';
import 'tippy.js/dist/tippy.css';

import { ApodContextProvider } from '../hooks/useApodContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApodContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApodContextProvider>
  );
}

export default MyApp;
