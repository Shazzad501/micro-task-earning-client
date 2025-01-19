import React from 'react';
import Slider from './Slider';
import { Helmet } from 'react-helmet-async';
import Testimonials from './Testimonials';


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home || Multi Task & Earning</title>
      </Helmet>
      <Slider/>
      <Testimonials/>

    </div>
  );
};

export default Home;