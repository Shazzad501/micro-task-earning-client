import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Helmet } from 'react-helmet-async';
import StripeCart from './StripeCart';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Publish_Key);

const PurchaseCoin = () => (
  <div>
    <Helmet>
      <title>Purchase Coin || Micro Task & Earning</title>
    </Helmet>
    <Elements stripe={stripePromise}>
      <StripeCart />
    </Elements>
  </div>
);

export default PurchaseCoin;
