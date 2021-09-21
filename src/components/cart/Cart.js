import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  container: {
    margin: '10px',
    width: '200px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },
});

const Cart = () => {
  const classes = useStyles();
  const cartItems = useSelector(({ cartItems }) => cartItems);
  const totalPrice = useSelector(({ cartItems }) =>
    Object.values(cartItems).reduce((acc, item) => {
      return item.price * item.count + acc;
    }, 0)
  );

  return (
    <div className={classes.container}>
      <div>
        <Typography component="h5" variant="h5">
          Cart
        </Typography>
        {cartItems && Object.values(cartItems).length > 0 ? (
          Object.values(cartItems).map((product) => (
            <CartItem key={product.id} product={product} />
          ))
        ) : (
          <Typography component="body1" variant="body1">
            Cart is empty
          </Typography>
        )}
      </div>
      <Typography component="h5" variant="h5">
        Total: {totalPrice}kr
      </Typography>
    </div>
  );
};

export default Cart;
