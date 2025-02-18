import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { Carousel } from 'react-responsive-carousel';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic'; 

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const { 
    isLoading, 
    error, 
    data: testimonials = [] 
  } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const res = await axiosPublic.get('/reviews');
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading testimonials...</p>; 
  }

  if (error) {
    return <p>Error loading testimonials: {error.message}</p>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl text-[#072129] font-bold text-center mb-10">What Our Users Say</h2>
        <Carousel 
          autoPlay 
          infiniteLoop 
          showStatus={false} 
          showThumbs={false} 
          interval={3000} 
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div>
                <img 
                  src={testimonial.photo} 
                  alt={testimonial.name} 
                  className="w-24 h-24 rounded-full mb-4" 
                />
              </div>
              <p className="text-lg mb-2">{testimonial.quote}</p>
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;