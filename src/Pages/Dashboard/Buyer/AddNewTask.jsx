import React from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

const AddNewTask = () => {
  const [signInUser, refetch] = useUserByEmail();
  const { totalCoin, userEmail, name, userPhoto } = signInUser || {};
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const watchWorkers = watch('required_workers', 0);
  const watchPayableAmount = watch('payable_amount', 0);

  const totalPayable = watchWorkers * watchPayableAmount;

  const handleImageUpload = async (file) => {
    if (file) {
      const imgData = new FormData();
      imgData.append('image', file);

      try {
        const response = await axiosPublic.post(img_hosting_api,imgData);
        if (response.data.success) {
          setValue('task_image_url', response.data.data.url);
          toast.success('Image uploaded successfully!');
        }
      } catch (error) {
        toast.error('Image upload failed!');
      }
    }
  };

  const onSubmit = async (data) => {
    const totalAmount = data.required_workers * data.payable_amount;

    if (totalAmount > totalCoin) {
      toast.error('Not enough coins. Please purchase more coins.');
      navigate('/dashboard/purchase-coin');
      return;
    }

    const taskData = {
      ...data,
      totalPayableCoin: totalPayable,
      buyerEmail: userEmail,
      buyerName: name,
      buyerPhoto: userPhoto,
      created_at: new Date(),
    };

    try {
      await axiosSecure.post('/tasks', taskData);
      toast.success('Task added successfully!');
      refetch();
      reset();
      navigate('/dashboard/buyer-task');
    } catch (error) {
      toast.error('Failed to save the task!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg">
      <Helmet>
        <title>Add New Task || Multi Task & Earning</title>
      </Helmet>
      <h1 className="text-2xl font-semibold text-center mb-6">Add a New Task</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Task Title */}
        <div>
          <label className="block font-medium mb-1">Task Title</label>
          <input
            {...register('task_title', { required: 'Task title is required' })}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter task title"
          />
          {errors.task_title && (
            <p className="text-red-500 text-sm">{errors.task_title.message}</p>
          )}
        </div>

        {/* Task Details */}
        <div>
          <label className="block font-medium mb-1">Task Detail</label>
          <textarea
            {...register('task_detail', { required: 'Task detail is required' })}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter task detail"
          ></textarea>
          {errors.task_detail && (
            <p className="text-red-500 text-sm">{errors.task_detail.message}</p>
          )}
        </div>

        {/* Required Workers */}
        <div>
          <label className="block font-medium mb-1">Required Workers</label>
          <input
            type="number"
            {...register('required_workers', { required: 'This field is required' })}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter number of workers"
          />
          {errors.required_workers && (
            <p className="text-red-500 text-sm">{errors.required_workers.message}</p>
          )}
        </div>

        {/* Payable Amount */}
        <div>
          <label className="block font-medium mb-1">Payable Coin per Worker</label>
          <input
            type="number"
            {...register('payable_amount', { required: 'This field is required' })}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter payable amount"
          />
          {errors.payable_amount && (
            <p className="text-red-500 text-sm">{errors.payable_amount.message}</p>
          )}
        </div>

        {/* Completion Date */}
        <div>
          <label className="block font-medium mb-1">Completion Date</label>
          <input
            type="date"
            {...register('completion_date', { required: 'Completion date is required' })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.completion_date && (
            <p className="text-red-500 text-sm">{errors.completion_date.message}</p>
          )}
        </div>

        {/* Submission Info */}
        <div>
          <label className="block font-medium mb-1">Submission Info</label>
          <input
            {...register('submission_info', { required: 'Submission info is required' })}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter submission info"
          />
          {errors.submission_info && (
            <p className="text-red-500 text-sm">{errors.submission_info.message}</p>
          )}
        </div>

        {/* Task Image */}
        <div>
          <label className="block font-medium mb-1">Task Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-md"
          />
          {watch('task_image_url') && (
            <img
              src={watch('task_image_url')}
              alt="Task"
              className="mt-2 h-32 w-32 object-cover rounded-md"
            />
          )}
        </div>

        {/* Total Payable Coin */}
        <div>
          <label className="block font-medium mb-1">Total Payable Coin</label>
          <p className="px-4 py-2 bg-gray-100 border rounded-md">{totalPayable || 0} coins</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddNewTask;