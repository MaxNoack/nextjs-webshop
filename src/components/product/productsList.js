import React from 'react';
import Grid from '@material-ui/core/Grid';

import Product from './product';

const ProductsList = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} item>
          <Product {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
