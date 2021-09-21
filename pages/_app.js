import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import reduxWrapper from '../src/store';
import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from './api/apolloClient';
import Snackbar from '@material-ui/core/Snackbar';

const MyApp = ({ Component, pageProps }) => {
  const [message, setMessage] = useState(null);
  const onCloseMessage = () => {
    setMessage(null);
  };
  const apolloClient = createApolloClient(setMessage);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="description" content="NextJS Webshop" />
        <title>NextJS Webshop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!message}
        onClose={onCloseMessage}
        message={message}
        key={message}
      />
    </ApolloProvider>
  );
};

export default reduxWrapper.withRedux(MyApp);
