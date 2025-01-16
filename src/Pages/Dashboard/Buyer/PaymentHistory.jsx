import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
  const [signInUser] = useUserByEmail();
  const axiosSecure = useAxiosSecure();
  const { _id } = signInUser || {};

  const { data: paymentHistory = [] } = useQuery({
    queryKey: [_id, 'paymentHistory'],
    queryFn: async () => {
      const res = await axiosSecure(`/payments/${_id}`);
      return res.data;
    },
    enabled: !!_id,
  });



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Helmet>
        <title>Payment History || Multi Task & Earning</title>
      </Helmet>

      <h1 className="text-2xl font-bold text-center mb-8">Payment History</h1>

      {paymentHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Coin</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr
                  key={payment.transactionId}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{payment.transactionId}</td>
                  <td className="px-4 py-2 text-center">${payment.amount}</td>
                  <td className="px-4 py-2 text-center">${payment.coinsAdded}</td>
                  <td className="px-4 py-2 text-center">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No payment history found.
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
