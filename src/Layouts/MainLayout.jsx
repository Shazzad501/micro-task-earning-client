import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';

const MainLayout = () => {
  return (
    <div>
      {/* navbar */}
      <Navbar/>
      <Outlet/>
      {/* footer */}
      <Footer/>
    </div>
  );
};

export default MainLayout;