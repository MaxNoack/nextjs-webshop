import React from 'react';
import Navbar from '../navbar/Navbar';

const Layout = ({ children, pages }) => {
  return (
    <>
      <Navbar pages={pages} />
      {children}
    </>
  );
};

export default Layout;
