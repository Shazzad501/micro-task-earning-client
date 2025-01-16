import React from 'react';
import { Helmet } from 'react-helmet-async';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyTasks = () => {
  const [signInUser, refetch] = useUserByEmail();
  const { userEmail } = signInUser || {};
  const axiosSecure = useAxiosSecure();

  const { data: tasks = [] } = useQuery({
    queryKey: [userEmail, 'tasks'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  const handleUpdate = (task) => {
    // Handle task update
  };

  const handleDelete = async (taskId) => {
    // Handle task deletion
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Helmet>
        <title>Buyer Task || Multi Task & Earning</title>
      </Helmet>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Buyer Tasks</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Task Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Completion Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {task.task_image_url ? (
                      <img
                        src={task.task_image_url}
                        alt="Task"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">{task.task_title}</td>
                  <td className="px-4 py-2">
                    {new Date(task.completion_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleUpdate(task)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-600">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;