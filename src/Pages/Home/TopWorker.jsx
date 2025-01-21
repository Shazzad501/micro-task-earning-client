import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCoins } from 'react-icons/fa';

const TopWorker = () => {
  const axiosSecure = useAxiosSecure();

  const { data: topWorkers = [] } = useQuery({
    queryKey: ['topWorkers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/top-workers');
      return res.data;
    },
  });

  return (
    <div className=" py-16 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Our Top Worker</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {topWorkers.map((worker) => (
          <div
            key={worker._id}
            className="bg-gray-100 rounded-lg shadow-md p-6 text-center flex flex-col items-center"
          >
            <img
              src={worker.userPhoto}
              alt={worker.name}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h3 className="text-lg font-bold mb-2">{worker.name}</h3>
            <p className="text-sm text-gray-600 mb-4 flex items-center gap-2"><span className='text-xl font-bold text-orange-400'><FaCoins/></span><span className='text-base font-bold'>{worker.totalCoin}</span></p>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopWorker;