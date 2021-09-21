import Layout from '../../src/components/Layout/Layout';
import { getMenuProps } from '../../lib/helpers';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getProducts } from '../api/queries';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import ProductsList from '../../src/components/product/productsList';
import Typography from '@material-ui/core/Typography';

export const getStaticProps = async () => {
  return {
    props: {
      pages: await getMenuProps(),
    },
  };
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '50px',
  },
  headerWrapper: {
    paddingBottom: '20px',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
  productWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const Products = ({ pages }) => {
  const { loading, data } = useQuery(getProducts);
  const classes = useStyles();
  return (
    <Layout pages={pages}>
      <div className={classes.wrapper}>
        <div className={classes.headerWrapper}>
          <Typography component="h4" variant="h4">
            Products
          </Typography>
          <Typography component="h6" variant="h6">
            Here is some fancy products!
          </Typography>
        </div>
        <div className={classes.content}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <div className={classes.productWrapper}>
                <ProductsList products={data.allProducts} />
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
