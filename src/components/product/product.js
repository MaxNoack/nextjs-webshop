import React from 'react';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '430px',
  },
  box: {
    padding: '10px',
    height: '100%',
  },
  image: {
    height: '20px',
  },
  price: { color: 'grey' },
  paper: { cursor: 'pointer' },
}));

const Product = ({ name, price, id, mainImage, alternativeImages }) => {
  const classes = useStyles();
  const carouselImages = [mainImage, ...alternativeImages];

  return (
    <Link
      href={{
        pathname: '/products/[id]',
        query: { id },
      }}
      passHref
    >
      <Paper className={classes.paper}>
        <div className={classes.box}>
          <div className={classes.content}>
            <Carousel
              autoPlay={false}
              animation={'slide'}
              indicators
              NavButtonsAlwaysVisible
            >
              {carouselImages.map(({ alt, url, id }) => (
                <Image
                  className={classes.image}
                  key={id}
                  alt={alt}
                  src={url}
                  objectFit={'cover'}
                  width={300}
                  height={225}
                />
              ))}
            </Carousel>
            <div className={classes.content}>
              <Typography component="h6" variant="h6">
                {name}
              </Typography>
              <Typography
                className={classes.price}
                component="h5"
                variant="h5"
              >
                {price}kr
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
    </Link>
  );
};

export default Product;
