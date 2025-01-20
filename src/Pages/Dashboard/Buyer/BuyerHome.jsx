import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineEye } from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Loading from '../../../Shared/Loading';
const BuyerHome = () => {
  const axiosSecure = useAxiosSecure();
  const [signInUser] = useUserByEmail();
  const { userEmail } = signInUser || {};

  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch buyer stats
  const { data: buyerStats = {}, isLoading: statsLoading } = useQuery({
    queryKey: [userEmail, 'buyerStats'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer-stats/${userEmail}`);
      return res.data.stats;
    },
    enabled: !!userEmail,
  });

  // Fetch data
  const { data: tasks = [], refetch } = useQuery({
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
  const handleApproveSubmission = (submissionId, workerEmail, payableAmount) => {
    const amount = parseInt(payableAmount);
    
    axiosSecure.put(`/submission/approve/${submissionId}`, {
      workerEmail, amount
    })
    .then(res=>{
      const [updateSubmissionResult, updateWorkerCoinResult] = res.data
      if(updateSubmissionResult.modifiedCount>0 && updateWorkerCoinResult.modifiedCount>0){
        refetch()
        toast.success(`Approve success`)
      }
    })
    .catch(err=>{
      toast.error(`Approve faild. ${err.message}`)
    })
  };

  // handle reject function
  const handleRejectSubmission = (submissionId, taskId) => {
    axiosSecure
      .put(`/submission/reject/${submissionId}`, { taskId })
      .then((res) => {
        const [updateSubmissionResult, updateTaskResult] = res.data;
        if (updateSubmissionResult.modifiedCount > 0 && updateTaskResult.modifiedCount > 0) {
          refetch();
          toast.success(`Rejected Submission`);
        }
      })
      .catch((err) => {
        toast.error(`Rejection faild: ${err.message}`);
      });
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

      {/* buyer stats */}
      <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
        {statsLoading ? (
          <Loading/>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold">Total Tasks</h3>
              <p className="text-2xl font-bold text-blue-500">{buyerStats.totalTaskCount}</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold">Pending Workers</h3>
              <p className="text-2xl font-bold text-orange-500">{buyerStats.pendingWorkers}</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold">Total Paid</h3>
              <p className="text-2xl font-bold text-green-500">
                <FaCoins className="inline-block text-yellow-500" /> {buyerStats.totalPaid}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* task table */}
      <div>
        <h2 className="font-bold text-2xl text-center">Tasks to Review</h2>
        {tasks.filter((task) => task.status === 'pending').length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No submission available</p>
        ) : (
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
                  <td className="p-4 font-bold text-base">
                    <p className="flex items-center gap-2">
                      <span className="text-orange-400 text-xl"><FaCoins /></span>
                      <span>{task.payable_amount}</span>
                    </p>
                  </td>
                  <td className="p-4 flex items-center justify-end space-x-2">
                    <button
                      title="View Submission"
                      className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-2"
                      onClick={() => handleViewSubmission(task)}
                    >
                      <AiOutlineEye size={20} />
                    </button>
                    <button
                      title="Approve"
                      className="text-green-500 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-full p-2"
                      onClick={() => handleApproveSubmission(task._id, task.worker_email, task.payable_amount)}
                    >
                      <AiOutlineCheckCircle size={20} />
                    </button>
                    <button
                      title="Reject"
                      className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full p-2"
                      onClick={() => handleRejectSubmission(task._id, task.task_id)}
                    >
                      <AiOutlineCloseCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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