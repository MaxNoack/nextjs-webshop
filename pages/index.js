import Layout from '../src/components/Layout/Layout';
import { getStartPage } from '../pages/api/queries';
import createApolloClient from './api/apolloClient';
import Image from 'next/image';
import { StructuredText } from 'react-datocms';
import { makeStyles } from '@material-ui/core/styles';
import { getMenuProps } from '../lib/helpers';

export const getStaticProps = async () => {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query({
    query: getStartPage,
  });
  return {
    props: {
      pageData: data?.startpage,
      pages: await getMenuProps(),
    },
  };
};

const useStyles = makeStyles((theme) => ({
  imageText: {
    position: 'absolute',
    top: '300px',
    left: '50%',
    zIndex: 1,
    color: 'black',
    transform: 'translate(-50%, -50%)',
  },
  headerHomePage: {
    textAlign: 'center',
  },
  imageHomePage: {
    opacity: 0.4,
  },
}));

const Home = ({ pages, pageData }) => {
  const classes = useStyles();
  return (
    <Layout pages={pages}>
      <div className={classes.imageHomePage}>
        <Image
          alt={pageData?.mainImage.alt}
          src={pageData?.mainImage.url}
          width={pageData?.mainImage.width}
          height={pageData?.mainImage.height}
          blurDataURL={pageData?.mainImage.blurUpThumb}
          placeholder="blur"
          objectFit={'cover'}
        />
      </div>
      <div className={classes.imageText}>
        <h1 className={classes.headerHomePage}>{pageData?.title}</h1>
        <div className={classes.bodyHomePage}>
          <StructuredText data={pageData?.content} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
