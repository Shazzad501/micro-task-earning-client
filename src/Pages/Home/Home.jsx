import React from 'react';
import Slider from './Slider';
import { Helmet } from 'react-helmet-async';
import Testimonials from './Testimonials';
import TopWorker from './TopWorker';
import Features from './Features';
import HowItWork from './HowItWork';
import EarnMore from './EarnMore';


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home || Micro Task & Earning</title>
      </Helmet>
      <Slider/>
      <Features/>
      <div className='max-w-7xl mx-auto'>
      <TopWorker/>
      </div>
      <HowItWork/>
      <Testimonials/>
      <EarnMore/>
    </div>
  );
};

export default Home;