import React from 'react';
import { Helmet } from 'react-helmet-async';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { TableContainer, TableHead, Table, TableBody, TableRow, TableCell } from '@mui/material';
import Loading from '../../../Shared/Loading';

const Submissions = () => {
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
    <div className='min-h-screen'>
      <Helmet>
        <title>Submission || Micro Task & Earning</title>
      </Helmet>
      <h2 className='font-bold text-2xl text-center my-5'>Submissions</h2>
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
              {submissions.map((submission) => (
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
  );
};

export default Submissions;