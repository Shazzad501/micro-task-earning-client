import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyTasks = () => {
  const [signInUser, refetch] = useUserByEmail();
  const { userEmail } = signInUser || {};
  const axiosSecure = useAxiosSecure();

  // fetch data into db
  const { data: tasks = [], refetch: taskRefetch} = useQuery({
    queryKey: [userEmail, 'tasks'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  // State for managing the task update form and modal visibility
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedTaskDetail, setUpdatedTaskDetail] = useState('');
  const [updatedSubmissionDetails, setUpdatedSubmissionDetails] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle task update
  const handleUpdate = (task) => {
    setTaskToUpdate(task);
    setUpdatedTitle(task.task_title);
    setUpdatedTaskDetail(task.task_detail);
    setUpdatedSubmissionDetails(task.submission_info);
    setIsModalOpen(true);
  };

  // Handle task deletion
  const handleDelete = (task) => {
    const { _id } = task || {};

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be delete this task!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/tasks/${_id}`, { data: { userEmail } })
          .then((res) => {
            const [deleteResult, updateResult] = res.data;
            if (deleteResult.deletedCount > 0 && updateResult.modifiedCount > 0) {
              refetch();
              taskRefetch()
              Swal.fire({
                  title: 'Deleted!',
                  text: 'Your task has been deleted and coins refilled.',
                  icon: 'success',
              });
            } else {
              toast.error('Error deleting task');
            }
          })
          .catch((err) => {
            toast.error(`Error deleting task: ${err.message}`);
          });
      }
    });
  };

  // Handle saving task updates
  const handleSaveUpdate = () => {
    const { _id, ...updatedTask } = taskToUpdate;
    updatedTask.task_title = updatedTitle;
    updatedTask.task_detail = updatedTaskDetail;
    updatedTask.submission_details = updatedSubmissionDetails;

      axiosSecure.patch(`/tasks/${taskToUpdate._id}`, updatedTask)
      .then(res=>{
        if (res.data.modifiedCount > 0) {
          setIsModalOpen(false);
          setTaskToUpdate(null);
          refetch();
          toast.success('Task updated successfully!');
        }
      })
     .catch (err =>{
      toast.error(`Error updating task: ${err.message}`);
    })
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToUpdate(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Helmet>
        <title>Buyer Task || Multi Task & Earning</title>
      </Helmet>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Your Tasks</h1>

      {/* Tasks Table */}
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
                      onClick={() => handleDelete(task)}
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

      {/* Modal for Task Update */}
      {isModalOpen && taskToUpdate && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Task</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Task Details</label>
              <textarea
                value={updatedTaskDetail}
                onChange={(e) => setUpdatedTaskDetail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Submission Details</label>
              <textarea
                value={updatedSubmissionDetails}
                onChange={(e) => setUpdatedSubmissionDetails(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={handleSaveUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks