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
    <section className="bg-white py-16 px-4">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-black">
        Meet Our <span className="text-[#183e49]">Top Workers</span>
      </h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {topWorkers.map((worker) => (
          <div
            key={worker._id}
            className="relative bg-white rounded-lg shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-3 hover:shadow-xl"
          >
            {/* Worker Image */}
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-[#0c2e38] shadow-lg">
              <img
                src={worker.userPhoto}
                alt={worker.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Worker Details */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-800">{worker.name}</h3>
            </div>

            {/* Earnings */}
            <div className="mt-4 flex items-center justify-center gap-2 text-orange-500 font-semibold text-lg">
              <FaCoins className="text-2xl" />
              <span>{worker.totalCoin}</span>
            </div>

            {/* Background Badge */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg opacity-10 -z-10"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopWorker;
