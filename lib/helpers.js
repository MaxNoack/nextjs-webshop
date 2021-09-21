import { getPages } from '../pages/api/queries';
import createApolloClient from '../pages/api/apolloClient';

export const getMenuProps = async () => {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query({ query: getPages });
  return data?.allPages;
}