import Layout from '../../src/components/Layout/Layout';
import { getMenuProps } from '../../lib/helpers';
import { getProducts, getProduct } from '../api/queries';
import { makeStyles } from '@material-ui/core/styles';
import createApolloClient from '../api/apolloClient';
import Button from '@material-ui/core/Button';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import { addItem } from '../../src/reducers';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';

export const getStaticProps = async (context) => {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query({
    query: getProduct,
    variables: {
      id: context.params.id,
    },
  });
  return {
    props: {
      productData: data?.product,
      pages: await getMenuProps(),
    },
  };
};

export const getStaticPaths = async () => {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query({ query: getProducts });
  const paths = data?.allProducts.map((product) => {
    return {
      params: { id: product.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    margin: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    maxWidth: 700,
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  price:{
    paddingBottom: '10px',
  }
}));

const Product = ({ pages, productData }) => {
  const dispatch = useDispatch();

  const carouselImages = [
    productData.mainImage,
    ...productData.alternativeImages,
  ];

  const onAdd = () => {
    dispatch(addItem(productData));
  };

  const classes = useStyles();
  return (
    <Layout pages={pages}>
      <div className={classes.headerWrapper}>
        <Carousel
          autoPlay={false}
          animation={'slide'}
          indicators
          NavButtonsAlwaysVisible
        >
          {carouselImages.map(({ alt, url, id, blurUpThumb }) => (
            <Image
              className={classes.image}
              key={id}
              alt={alt}
              src={url}
              objectFit={'cover'}
              width={700}
              height={400}
              blurDataURL={blurUpThumb}
              placeholder="blur"
            />
          ))}
        </Carousel>
        <div className={classes.content}>
          <Typography component="h5" variant="h5">
            {productData.name}
          </Typography>
          <Typography className={classes.price} component="h6" variant="h6">
            {productData.price}kr
          </Typography>
          <Button variant="contained" color="primary" onClick={onAdd}>
            Get it!
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
