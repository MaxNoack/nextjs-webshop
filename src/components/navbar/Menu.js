import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/dist/client/router';

const MenuComponent = ({ pages = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const pagesMenuLinks = [...pages, {
    title: 'Products', slug: 'products'
  }];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItemClick = (event, url) => {
    handleClick(event);
    router.push(url);
    handleClose();
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        disabled={pages.length === 0}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {pagesMenuLinks.map(({ title, slug }) => (
          <MenuItem key={title} onClick={(e) => menuItemClick(e, `/${slug}`)}>
            {title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MenuComponent;
