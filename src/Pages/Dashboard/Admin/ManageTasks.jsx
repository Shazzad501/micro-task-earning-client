import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';

const ManageTasks = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/tasks'); // Replace with your API endpoint
      return res.data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Manage Tasks (Admin View)</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Task List (Admin View)</h2>
      <table className="w-full rounded-md shadow-md">
        <thead>
          <tr className="text-left bg-gray-100 text-gray-600 font-medium">
            <th className="p-4 pl-8">Buyer Photo</th>
            <th className="p-4">Task Title</th>
            <th className="p-4">Required Workers</th>
            <th className="p-4">Payable Coin</th>
            <th className="p-4">Completion Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 pr-8">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="p-4 pl-8">
                <img
                  title={`Name: ${task.buyerName}, Email: ${task.buyerEmail}`}
                  className="w-12 h-12 rounded-full object-cover"
                  src={task.buyerPhoto}
                  alt=""
                />
              </td>
              <td className="p-4 text-base font-bold">{task.task_title}</td>
              <td className="p-4 text-base font-bold">{task.required_workers}</td>
              <td className="p-4 flex items-center gap-2"><span className='text-orange-500'><FaCoins/></span> <span className='font-bold text-base'>{task.payable_amount}</span></td>
              <td className="p-4 text-base font-bold">{task.completion_date}</td>
              <td className="p-4 text-base font-bold">{task.status}</td>
              <td className="p-4 pr-8 flex items-center justify-end">
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-2"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  <AiOutlineDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTasks;