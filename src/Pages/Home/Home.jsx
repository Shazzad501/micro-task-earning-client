import React from 'react';
import Slider from './Slider';
import { Helmet } from 'react-helmet-async';
import Testimonials from './Testimonials';
import TopWorker from './TopWorker';
import Features from './Features';


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home || Multi Task & Earning</title>
      </Helmet>
      <Slider/>
      <Features/>
      <div className='max-w-7xl mx-auto'>
      <TopWorker/>
      </div>
      <Testimonials/>

    </div>
  );
};

export default Home;