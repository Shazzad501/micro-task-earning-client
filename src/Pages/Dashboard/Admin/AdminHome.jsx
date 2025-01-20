import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  const { data: withdrawals = [],refetch } = useQuery({
    queryKey: ['withdrawals'],
    queryFn: async () => {
      const res = await axiosSecure.get('/withdrawals');
      return res.data;
    },
  });

  const handlePaymentSuccess = (withdrawalId) => {
    axiosSecure.patch(`/withdrawals/${withdrawalId}`)
    .then(res=>{
      const [updateWithdrawalResult, updateUserCoinsResult] = res.data
      if(updateWithdrawalResult.modifiedCount > 0 && updateUserCoinsResult.modifiedCount
        > 0){
        refetch();
        toast.success(`Status update done!`)
      }
    })
    .catch(err=>{
      toast.error(`Approve faild. ${err.message}`)
    })
  };

  return (
    <div>
      <Helmet>
        <title>Admin Home || Multi Task & Earning</title>
      </Helmet>
      {/* Admin stats */}
      <div>
        <h2>Admin stats</h2>
      </div>

      {/* Withdraw requests */}
      {withdrawals.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold text-2xl">Withdraw Requests</h2>
          <div className="overflow-x-auto rounded-md shadow-md">
            <table className="w-full text-left text-gray-500">
              <thead>
                <tr className="text-xs font-medium text-gray-700 bg-gray-100">
                  <th className="p-4">Worker Email</th>
                  <th className="p-4">Worker Name</th>
                  <th className="p-4">Coins</th>
                  <th className="p-4">Amount ($)</th>
                  <th className="p-4">Payment System</th>
                  <th className="p-4">Account Number</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals
                  .map((withdrawal) => (
                    <tr key={withdrawal._id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="p-4">{withdrawal.worker_email}</td>
                      <td className="p-4">{withdrawal.worker_name}</td>
                      <td className="p-4">{withdrawal.withdrawal_coin}</td>
                      <td className="p-4">{withdrawal.withdrawal_amount}</td>
                      <td className="p-4">{withdrawal.payment_system}</td>
                      <td className="p-4">{withdrawal.account_number}</td>
                      <td className="p-4 text-yellow-500">{withdrawal.status}</td>
                      <td className="p-4">
                        <button
                          className="btn btn-sm text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded disabled:opacity-50"
                          disabled={selectedWithdrawal === withdrawal._id}
                          onClick={() => handlePaymentSuccess(withdrawal._id)}
                        >
                          {selectedWithdrawal === withdrawal._id ? 'Processing...' : 'Success'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {withdrawals.length === 0 && ( 
        <div className="mt-4 text-center">
          <p className="text-gray-500">No withdrawal requests found.</p>
        </div>
      )}
    </div>
  );
};

export default AdminHome;