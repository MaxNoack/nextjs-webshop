import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { addItem, removeItem } from '../../reducers';

const useStyles = makeStyles({
  card: {
    margin: '5px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  counter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '5px 10px 0px 10px',
  },
});

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const onAdd = () => {
    dispatch(addItem(product));
  };

  const onRemove = () => {
    dispatch(removeItem(product));
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography component="h6" variant="h6">
          {product.name}
        </Typography>
        <Typography component="body1" variant="body1">
          Price: {product.price}kr
        </Typography>
        <div className={classes.counter}>
          <IconButton size="small">
            <RemoveCircleOutlineIcon
              style={{ fontSize: 30 }}
              onClick={onRemove}
            />
          </IconButton>
          <Typography component="h5" variant="h5">
            {product.count}
          </Typography>
          <IconButton size="small">
            <AddCircleOutlineIcon style={{ fontSize: 30 }} onClick={onAdd} />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
