import React from 'react';
import { Helmet } from 'react-helmet-async';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { TableContainer, TableHead, Table, TableBody, TableRow, TableCell } from '@mui/material';
import Loading from '../../../Shared/Loading';

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();
  const [signInUser] = useUserByEmail();
  const { userEmail } = signInUser || {};

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
      <Helmet><title>Worker Home || Multi Task & Earning</title></Helmet>
      
      <div>
        <h2>Worker stats</h2>
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