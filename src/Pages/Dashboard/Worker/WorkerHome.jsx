import React from 'react';
import { Helmet } from 'react-helmet-async';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { TableContainer, TableHead, Table, TableBody, TableRow, TableCell } from '@mui/material';
import Loading from '../../../Shared/Loading';
import { FaCoins } from 'react-icons/fa';

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();
  const [signInUser] = useUserByEmail();
  const { userEmail } = signInUser || {};

  // Fetch worker stats
  const { isLoading: statsLoading, data: stats } = useQuery({
    queryKey: [userEmail, 'worker-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker-stats/${userEmail}`);
      // console.log(res.data.stats)
      return res.data.stats;
    },
    enabled: !!userEmail,
  });

  // fetch all task
  const { isLoading, data: submissions = [] } = useQuery({
    queryKey: [userEmail, 'submissions'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submission/${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });
  return (
    <div>
      <Helmet><title>Worker Home || Micro Task & Earning</title></Helmet>
      
     {/* Worker Stats Section with Tailwind CSS */}
     <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
        {statsLoading ? (
          <Loading />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold">Total Submissions</h3>
              <p className="text-2xl font-bold text-blue-500">{stats?.totalSubmissions}</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold">Pending Submissions</h3>
              <p className="text-2xl font-bold text-orange-500">{stats?.totalPendingSubmissions}</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold">Total Earnings</h3>
              <p className="text-2xl font-bold text-green-500">
                <FaCoins className="inline-block text-yellow-500" /> {stats?.totalEarnings} coins
              </p>
            </div>
          </div>
        )}
      </div>

      <div>
      <h2 className='font-bold text-2xl text-center my-5'>All Approved Submission</h2>
      {isLoading ? (
        <Loading/>
      ) : submissions.length > 0 ? (
        <TableContainer sx={{ width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='font-extrabold text-lg'>Task Title</TableCell>
                <TableCell className='font-extrabold text-lg'>Buyer Name</TableCell>
                <TableCell className='font-extrabold text-lg'>Status</TableCell>
                <TableCell className='font-extrabold text-lg'>Payable Coin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.filter(submission=> submission.status === 'approved').map((submission) => (
                <TableRow key={submission._id}>
                  <TableCell className='font-bold text-base'>{submission.task_title}</TableCell>
                  <TableCell className='font-bold text-base'>{submission.Buyer_name}</TableCell>
                  <TableCell
                  className='font-bold text-base'
                    sx={{
                      color: submission.status === 'pending' ? 'red' : 'green',
                    }}
                  >
                    {submission.status}
                  </TableCell>
                  <TableCell className='font-bold text-base'>{submission.payable_amount} coin</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p className='text-base font-bold text-center'>No submissions found.</p>
      )}
      </div>
    </div>
  );
};

export default WorkerHome;