import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer';
import { Helmet } from 'react-helmet-async';

const MainLayout = () => {
  const location = useLocation()
  const signInSignUpPage = location.pathname.includes('signIn') || location.pathname.includes('signUp')
  return (
    <div>
      {/* navbar */}
      {signInSignUpPage || <Navbar/>}
      <div className='min-h-screen'>
      <Outlet/>
      </div>
      {/* footer */}
      {signInSignUpPage || <Footer/>}
    </div>
  );
};

export default MainLayout;