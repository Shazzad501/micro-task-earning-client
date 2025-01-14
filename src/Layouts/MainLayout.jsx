import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer';

const MainLayout = () => {
  const location = useLocation()
  const signInSignUpPage = location.pathname.includes('signIn') || location.pathname.includes('signUp')
  return (
    <div>
      {/* navbar */}
      {signInSignUpPage || <Navbar/>}
      <Outlet/>
      {/* footer */}
      {signInSignUpPage || <Footer/>}
    </div>
  );
};

export default MainLayout;