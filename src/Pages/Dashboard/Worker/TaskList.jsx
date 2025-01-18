import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import Loading from '../../../Shared/Loading';

const TaskList = () => {
  const axiosSecure = useAxiosSecure();

  const { isLoading, error, data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tasks'); 
      return res.data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <Helmet>
        <title>Task list || Multi Task & Earning</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-8">Available Tasks</h1>

      {isLoading ? (
        <Loading/> 
      ) : error ? (
        <p className="text-red-500 text-center">Error fetching tasks: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="rounded-lg shadow-md overflow-hidden">
              <img
                src={task.task_image_url || 'https://via.placeholder.com/150'}
                alt={task.task_title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{task.task_title}</h3>
                <div className="flex justify-between">
                  <p className="text-gray-700 mb-2">
                    By: {task.buyerName}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Required worker: {task.required_workers}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">
                    Completion Date: {task.completion_date}
                  </p>
                  <p className="text-green-500 font-semibold">
                    {task.payable_amount} Coins
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <Link
                    to={`/tasks/${task._id}`}
                    className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg px-4 py-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No tasks available yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;