import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import toast from 'react-hot-toast';


const TaskDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [signInUser] = useUserByEmail()
  const {name, userEmail} = signInUser || {}
  const navigate = useNavigate();

  // fetch task into db
  const { isLoading, error, data: task = {} } = useQuery({
    queryKey: [id, 'task'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/singletasks/${id}`);
      return res.data;
    },
    // enabled: !!id,
  });

  const {
    buyerName,_id,
    buyerEmail,task_image_url,
    submission_info,completion_date,
    payable_amount,
    required_workers,task_detail,
    task_title} = task || {}


    // submission detail handler state
  const [submissionDetails, setSubmissionDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmissionError(null);

    // submitable task
    const submitableTask= {
      task_id: _id,
      task_title: task_title,
      payable_amount: payable_amount,
      worker_email: userEmail,
      submission_details: submissionDetails,
      worker_name: name,
      Buyer_name: buyerName,
      Buyer_email: buyerEmail,
      current_date: new Date().toISOString(),
      status: 'pending',
    }

    try {
      const res = await axiosSecure.post('/submission', submitableTask);
      const [postResult, updateRquiredWorker] = res.data;
      if(postResult.insertedId && updateRquiredWorker.modifiedCount>0){
        toast.success('Task Submited!')
        setSubmissionDetails('');
        setIsSubmitting(false);
        navigate('/dashboard/worker-submission')
      };
    } catch (err) {
      toast.error(`${err.message}`)
      setSubmissionError(err.message || 'An error occurred while submitting.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-28">
      <Helmet>
        <title>Task Details || Multi Task & Earning</title>
      </Helmet>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-center">Error fetching task: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg shadow-md overflow-hidden">
            <img
              src={task_image_url}
              alt={task_title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">{task_title}</h3>
              <p className="text-gray-700 mb-4">{task_detail}</p>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">**Buyer Name:**</p>
                <p className="text-gray-700">{buyerName}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">**Required Workers:**</p>
                <p className="text-gray-700">{required_workers}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">**Payable Amount:**</p>
                <p className="text-green-500 font-semibold">{payable_amount} Coins</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700">**Completion Date:**</p>
                <p className="text-gray-700">{completion_date}</p>
              </div>
              {task.submission_info && ( 
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">**Submission Info:**</p>
                  <p className="text-gray-700">{submission_info}</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg shadow-md overflow-hidden p-4">
            <h4 className="text-lg font-medium mb-4">Submit Your Work</h4>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                placeholder="Enter your submission details here"
                value={submissionDetails}
                onChange={(e) => setSubmissionDetails(e.target.value)}
                required
              />
              {submissionError && (
                <p className="text-red-500 mb-4">{submissionError}</p>
              )}
              <button
                type="submit"
                className="bg-[#072129] hover:bg-[#0a2d38] text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;