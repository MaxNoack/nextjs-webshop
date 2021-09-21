import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

const apolloClient = (setNotificationMessage = null) => {
  const cache = new InMemoryCache();

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      const errors = [];
      graphQLErrors.forEach(({ message, path }) => {
        const errorString = `[GraphQL error]: Message: ${message}`;
        console.log(`%c ${errorString}`, 'color: red');
        errors.push(errorString);
      });
      setNotificationMessage && setNotificationMessage(errors);
    }

    if (networkError) {
      const error = `[Network error]: ${operation.operationName} ${networkError.message}`;
      console.log(`%c ${error}`, 'color: red');
      setNotificationMessage && setNotificationMessage(error);
    }
  });

  const authLink = setContext((_, { headers }) => {
    const token = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN;
    const context = {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
    return context;
  });

  const httpLink = new HttpLink({ uri: 'https://graphql.datocms.com/' });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache,
    connectToDevTools: true,
  });

  return client;
};

export default apolloClient;
