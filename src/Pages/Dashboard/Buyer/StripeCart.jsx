import React, { useState } from 'react';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUserByEmail from '../../../Hooks/useUserByEmail';
import { useNavigate } from 'react-router-dom';


// Coin packages
const packages = [
  { coins: 10, amount: 1 },
  { coins: 150, amount: 10 },
  { coins: 500, amount: 20 },
  { coins: 1000, amount: 35 },
];

const StripeCart = () => {
  const axiosSecure = useAxiosSecure();
  const [signInUser, refetch] = useUserByEmail();
  const { _id, name, userEmail, userPhoto } = signInUser || {};
  const navigate = useNavigate()

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe is not loaded yet. Please refresh the page.');
      return;
    }

    if (!selectedPackage) {
      toast.error('Please select a package before proceeding.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error('Payment form is not loaded. Please refresh the page.');
      return;
    }

    setLoading(true);

    try {
      // Request backend to create a payment intent
      const { data } = await axiosSecure.post('/create-payment-intent', {
        amount: selectedPackage.amount,
        buyerId: _id,
        buyerEmail: userEmail,
      });

      // Confirm the payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        toast.error(result.error.message || 'Payment failed. Please try again.');
      } else if (result.paymentIntent.status === 'succeeded') {
        // Notify the backend about the successful payment
        await axiosSecure.post('/payment-success', {
          paymentIntentId: result.paymentIntent.id,
          buyerId: _id,
          buyerEmail: userEmail,
          buyerName: name,
          buyerPhoto: userPhoto,
          adableCoin: selectedPackage.coins,
        });
        refetch()
        toast.success('Payment successful! Coins added to your account.');
        navigate('/dashboard/payment-history')
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Purchase Coins || Micro Task & Earning</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Purchase Coin? Click any Cart!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.coins}
              className={`bg-[#072129] hover:bg-[#0a2d38] text-white shadow-lg rounded-lg p-6 text-center ${
                selectedPackage?.coins === pkg.coins ? 'border-2 border-[#072129]' : ''
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <h2 className="text-xl font-bold">{pkg.coins} Coins</h2>
              <p className="text-white mt-2">${pkg.amount}</p>
            </div>
          ))}
        </div>
        {selectedPackage && (
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-center">
                Selected Package: {selectedPackage.coins} Coins for ${selectedPackage.amount}
              </h2>
              <CardElement className="border p-2 rounded bg-gray-50" />
              <button
                type="submit"
                className={`w-full py-2 bg-[#072129] hover:bg-[#0a2d38] text-white font-bold rounded ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay $${selectedPackage.amount}`}
              </button>
            </form>
          </div>
        )}
      </div>
      </div>
  );
};

export default StripeCart;
