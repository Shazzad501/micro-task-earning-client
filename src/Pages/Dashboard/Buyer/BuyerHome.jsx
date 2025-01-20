import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineEye } from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
const BuyerHome = () => {
  const axiosSecure = useAxiosSecure();
  const [signInUser] = useUserByEmail();
  const { userEmail } = signInUser || {};

  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch data
  const { data: tasks = [] } = useQuery({
    queryKey: [userEmail, 'tasks'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissionbuyer/${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  // view submission handler fuction
  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
  };

  // handle approve function
  const handleApproveSubmission = async (submissionId) => {
    try {
      await axiosSecure.put(`/api/submissions/approve/${submissionId}`); // Replace with your API endpoint
      // Update tasks state or refetch data after successful approval
      console.log('Submission approved successfully');
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };

  // handle reject function
  const handleRejectSubmission = async (submissionId) => {
    try {
      await axiosSecure.put(`/api/submissions/reject/${submissionId}`); // Replace with your API endpoint
      // Update tasks state or refetch data after successful rejection
      console.log('Submission rejected successfully');
    } catch (error) {
      console.error('Error rejecting submission:', error);
    }
  };

  // modal handler function
  const closeModal = () => {
    setSelectedSubmission(null);
  };

  return (
    <div>
      <Helmet>
        <title>Buyer Home || Multi Task & Earning</title>
      </Helmet>
      <div>
        <h2>Buyer stats</h2>
      </div>

      <div>
        <h2 className="font-bold text-2xl text-center">Tasks to Review</h2>
        <table className="w-full rounded-md shadow-md mt-4">
          <thead>
            <tr className="text-left bg-gray-100 text-gray-600 font-medium">
              <th className="p-4 font-bold text-lg">Worker Name</th>
              <th className="p-4 font-bold text-lg">Task Title</th>
              <th className="p-4 font-bold text-lg">Payable Amount</th>
              <th className="p-4 font-bold text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.filter((task) => task.status === 'pending').map((task) => (
              <tr key={task._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-4 font-bold text-base">{task.worker_name}</td>
                <td className="p-4 font-bold text-base">{task.task_title}</td>
                <td className="p-4 font-bold text-base"><p className='flex items-center gap-2'><span className='text-orange-400 text-xl'><FaCoins/></span><span>{task.payable_amount}</span></p></td>
                <td className="p-4 flex items-center justify-end space-x-2">
                  <button
                  title='View Submission'
                    className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-2"
                    onClick={() => handleViewSubmission(task)}
                  >
                    <AiOutlineEye size={20} />
                  </button>
                  <button
                  title='Approve'
                    className="text-green-500 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-full p-2"
                    onClick={() => handleApproveSubmission(task._id)}
                  >
                    <AiOutlineCheckCircle size={20} />
                  </button>
                  <button
                  title='Reject'
                    className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-2"
                    onClick={() => handleRejectSubmission(task._id)}
                  >
                    <AiOutlineCloseCircle size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submission Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50" />
          <div className="relative p-10 w-full max-w-2xl max-h-full overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl">
              <div className="flex justify-between p-4 bg-gray-100 rounded-t-lg">
                <h3 className="text-lg font-medium text-gray-900">
                  Submission Details
                </h3>
                <button
                title='Close'
                  className="text-red-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-full p-2"
                  onClick={closeModal}
                >
                  <FaXmark/>
                </button>
              </div>
              <div className="p-6">
            
                <p className='text-base font-bold'>{selectedSubmission.submission_details}</p>
                {/* Add more details as needed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;