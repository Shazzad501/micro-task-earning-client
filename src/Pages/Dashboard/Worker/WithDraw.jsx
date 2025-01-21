import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const Withdraw = () => {
  const axiosSecure = useAxiosSecure();
  const [signInUser] = useUserByEmail();
  const { totalCoin, userEmail, name } = signInUser || {};

  const [coinsToWithdraw, setCoinsToWithdraw] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [withdrawalError, setWithdrawalError] = useState(null);

  const { mutate: createWithdrawal, isLoading: isWithdrawing } = useMutation({
    mutationFn: async (withdrawalData) => {
      const res = await axiosSecure.post('/withdrawals', withdrawalData);
      return res;
    },
    onSuccess: () => {
      toast.success('Withdrawal request submitted successfully!');
      setCoinsToWithdraw(0);
      setWithdrawalAmount(0);
      setPaymentSystem('');
      setAccountNumber('');
      setWithdrawalError(null);
    },
    onError: (error) => {
      toast.error(error.message || 'Withdrawal failed.');
      setWithdrawalError(error.message || 'Withdrawal failed.');
    },
  });

  useEffect(() => {
    if (coinsToWithdraw > 0) {
      const calculatedAmount = coinsToWithdraw / 20;
      setWithdrawalAmount(calculatedAmount.toFixed(2)); 
    } else {
      setWithdrawalAmount(0);
    }
  }, [coinsToWithdraw]);

  const handleWithdraw = async () => {
    if (totalCoin < 200) { 
      setWithdrawalError('You do not have available coin. Minimum withdrawal amount is 200 coins.');
      return;
    }

    if (coinsToWithdraw < 200) {
      setWithdrawalError('Insufficient coins. Minimum withdrawal amount is 200 coins.');
      return;
    }

    if (!paymentSystem || !accountNumber) {
      setWithdrawalError('Please select a payment system and enter your account number.');
      return;
    }

    try {
      await createWithdrawal({
        worker_email: userEmail,
        worker_name: name,
        withdrawal_coin: coinsToWithdraw,
        withdrawal_amount: withdrawalAmount,
        payment_system: paymentSystem,
        account_number: accountNumber,
        status: 'pending'
      });
    } catch (error) {
      toast.error(`Withdrawal error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen p-4"> 
      <Helmet><title>Withdraw || Micro Task & Earnings</title></Helmet>
      <h2 className="text-2xl font-bold text-center mb-4">Withdraw Earnings</h2>
      
        <>
          <div className="flex justify-center items-center mb-4">
            <span className="text-lg">Total Earnings: {totalCoin || 0} Coins </span>
            <span className="text-lg ml-2">Withdrawal Amount: ${totalCoin / 20 || 0.00}</span> 
          </div> 
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="coinsToWithdraw" className="block text-sm font-medium text-gray-700">
                Coins to Withdraw
              </label>
              <input 
                type="number" 
                id="coinsToWithdraw" 
                value={coinsToWithdraw} 
                onChange={(e) => setCoinsToWithdraw(Math.max(0, parseInt(e.target.value)))} 
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="withdrawalAmount" className="block text-sm font-medium text-gray-700">
                Withdrawal Amount ($)
              </label>
              <input 
                type="number" 
                id="withdrawalAmount" 
                value={withdrawalAmount} 
                readOnly 
                className="mt-1 p-2 w-full border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="paymentSystem" className="block text-sm font-medium text-gray-700">
                Select Payment System
              </label>
              <select 
                id="paymentSystem" 
                value={paymentSystem} 
                onChange={(e) => setPaymentSystem(e.target.value)} 
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <input 
                type="text" 
                id="accountNumber" 
                value={accountNumber} 
                onChange={(e) => setAccountNumber(e.target.value)} 
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            {withdrawalError && (
              <p className="text-red-500">{withdrawalError}</p>
            )}
            <button
            onClick={handleWithdraw} 
              disabled={isWithdrawing || coinsToWithdraw < 200 || !paymentSystem || !accountNumber} 
              className="bg-[#072129] hover:bg-[#0a2d38] text-white font-bold py-2 px-4 rounded w-full"
            >
              {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
            </button>
          </div>
        </>
    </div>
  );
};

export default Withdraw;