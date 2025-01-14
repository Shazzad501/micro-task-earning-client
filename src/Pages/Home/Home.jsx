import React from 'react';
import Slider from './Slider';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home || Multi Task & Earning</title>
      </Helmet>
      <Slider/>
    </div>
  );
};

export default Home;