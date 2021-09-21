import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Image from 'next/image';
import MenuComponent from './MenuComponent';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Drawer from '@material-ui/core/Drawer';
import Cart from '../cart/Cart';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  bar: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    padding: '10px',
  },

  link: {
    color: 'white',
    textDecoration: 'none',
  },
  logo: {
    height: '20px',
  },
});

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid`,
    padding: '0 4px',
  },
}))(Badge);

const Navbar = ({ pages }) => {
  const classes = useStyles();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerVisible(open);
  };

  const cartItemsCount = useSelector(({ cartItems }) =>
    cartItems
      ? Object.values(cartItems).reduce((acc, item) => {
          return item.count + acc;
        }, 0)
      : 0
  );

  return (
    <AppBar position="static">
      <Toolbar className={classes.bar}>
        <MenuComponent pages={pages} />
        <Link href={'/'} passHref>
          <a className={classes.link}>
            <div className={classes.logoContainer}>
              <Typography
                className={classes.header}
                component="h6"
                variant="h6"
              >
                NextJS Webshop
              </Typography>
            </div>
          </a>
        </Link>
        <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
          <StyledBadge badgeContent={cartItemsCount} color="secondary">
            <ShoppingCartOutlinedIcon style={{ color: 'AliceBlue' }} />
          </StyledBadge>
        </IconButton>
        <Drawer
          anchor={'right'}
          open={drawerVisible}
          onClose={toggleDrawer(false)}
        >
          <Cart />
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
